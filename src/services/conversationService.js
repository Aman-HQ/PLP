import { supabase } from '../utils/supabase';
import { CONVERSATIONS as DEFAULT_CONVERSATIONS } from '../components/dash-app/conversations';

/**
 * Service to manage Conversations, Messages, and Topic Mastery with Supabase.
 * Gracefully integrates real-time database state with educational UI cards.
 */
export const conversationService = {
  /**
   * Fetch all conversations for the authenticated user.
   * If the user has no records in the DB yet, seeds default major subjects.
   */
  async getUserConversations(userId) {
    if (!userId) return DEFAULT_CONVERSATIONS;

    try {
      const { data, error } = await supabase
        .from('conversations')
        .select('id, title, subject, topic, is_bookmarked, created_at, updated_at')
        .order('updated_at', { ascending: false });

      if (error) throw error;

      if (!data || data.length === 0) {
        // Automatically initialize default starter conversations for new student
        return await this.seedStarterConversations(userId);
      }

      return data;
    } catch (err) {
      console.warn('Error fetching conversations, using local defaults:', err);
      return DEFAULT_CONVERSATIONS;
    }
  },

  /**
   * Seed starter university conversations for a new student in the database.
   */
  async seedStarterConversations(userId) {
    if (!userId) return DEFAULT_CONVERSATIONS;

    try {
      const insertedConvs = [];

      for (const starter of DEFAULT_CONVERSATIONS) {
        const { data: conv, error: convErr } = await supabase
          .from('conversations')
          .insert({
            user_id: userId,
            title: starter.title,
            subject: starter.subject || 'General',
            topic: starter.topic || starter.title,
            is_bookmarked: false,
          })
          .select()
          .single();

        if (convErr) {
          console.warn('Could not seed conversation:', convErr.message);
          continue;
        }

        // Insert initial student query message
        await supabase.from('messages').insert({
          conversation_id: conv.id,
          sender_id: userId,
          role: 'user',
          content: starter.userQuery,
          created_at: new Date(Date.now() - 3600000).toISOString(),
        });

        // Insert initial AI Tutor structured response
        await supabase.from('messages').insert({
          conversation_id: conv.id,
          role: 'assistant',
          content: typeof starter.introText === 'string' 
            ? starter.introText 
            : "Both the Fundamental Theorem of Calculus (FTC) and Stokes' Theorem relate the integral of a derivative over a region to the integral of the original function over the boundary.",
          cards: [
            {
              title: starter.card1?.title || 'Concept 1',
              description: starter.card1?.description || '',
              formulaText: '∫ f\'(x) dx = f(b) - f(a)'
            },
            {
              title: starter.card2?.title || 'Concept 2',
              description: starter.card2?.description || '',
              formulaText: '∬ (∇ × F) · dS = ∮ F · dr'
            }
          ],
          key_insight: typeof starter.keyInsight === 'string' 
            ? starter.keyInsight 
            : "Stokes' Theorem generalizes the Fundamental Theorem of Calculus to higher dimensions: boundary integration yields interior circulation.",
          created_at: new Date(Date.now() - 3500000).toISOString(),
        });

        insertedConvs.push(conv);
      }

      return insertedConvs.length > 0 ? insertedConvs : DEFAULT_CONVERSATIONS;
    } catch (err) {
      console.warn('Seeding failed, using defaults:', err);
      return DEFAULT_CONVERSATIONS;
    }
  },

  /**
   * Fetch chronological messages for a conversation thread.
   */
  async getMessages(conversationId) {
    if (!conversationId) return [];

    try {
      const { data, error } = await supabase
        .from('messages')
        .select('id, conversation_id, sender_id, role, content, cards, key_insight, feedback, metadata, created_at')
        .eq('conversation_id', conversationId)
        .order('created_at', { ascending: true });

      if (error) throw error;
      return data || [];
    } catch (err) {
      console.warn('Error fetching messages for conversation:', conversationId, err);
      return [];
    }
  },

  /**
   * Create a new conversation thread.
   */
  async createConversation(userId, { title, subject = 'General', topic = '' }) {
    if (!userId) throw new Error('User ID is required');

    const { data, error } = await supabase
      .from('conversations')
      .insert({
        user_id: userId,
        title: title || 'New Topic Inquiry',
        subject,
        topic: topic || title,
      })
      .select()
      .single();

    if (error) throw error;
    return data;
  },

  /**
   * Save a user or assistant message to the database.
   */
  async saveMessage({ conversationId, senderId = null, role, content, cards = [], keyInsight = null, metadata = {} }) {
    if (!conversationId || !content) return null;

    try {
      const { data, error } = await supabase
        .from('messages')
        .insert({
          conversation_id: conversationId,
          sender_id: senderId,
          role,
          content,
          cards,
          key_insight: keyInsight,
          metadata,
        })
        .select()
        .single();

      if (error) throw error;

      // Touch conversations.updated_at
      await supabase
        .from('conversations')
        .update({ updated_at: new Date().toISOString() })
        .eq('id', conversationId);

      return data;
    } catch (err) {
      console.error('Failed to save message to database:', err);
      return null;
    }
  },

  /**
   * Toggle bookmark status of a conversation.
   */
  async toggleBookmark(conversationId, currentStatus) {
    if (!conversationId) return;

    try {
      const { error } = await supabase
        .from('conversations')
        .update({ is_bookmarked: !currentStatus, updated_at: new Date().toISOString() })
        .eq('id', conversationId);

      if (error) throw error;
      return !currentStatus;
    } catch (err) {
      console.error('Failed to toggle bookmark:', err);
      return currentStatus;
    }
  },

  /**
   * Save Thumbs Up / Down feedback on an explanation.
   */
  async saveFeedback(messageId, feedback) {
    if (!messageId) return;

    try {
      const { error } = await supabase
        .from('messages')
        .update({ feedback })
        .eq('id', messageId);

      if (error) throw error;
    } catch (err) {
      console.error('Failed to save message feedback:', err);
    }
  },

  /**
   * Fetch topic mastery records for the Study Plan Modal.
   */
  async getTopicMastery(userId, subject = null) {
    if (!userId) {
      return [
        { name: 'Stokes’ Theorem in 3D', mastery: 88, status: 'In Review' },
        { name: 'Divergence Theorem', mastery: 74, status: 'Up Next' },
        { name: 'Line Integrals & Green’s Theorem', mastery: 95, status: 'Mastered' },
        { name: 'QuickSort Partitioning', mastery: 82, status: 'In Review' },
      ];
    }

    try {
      let query = supabase
        .from('student_topic_mastery')
        .select('id, subject, topic_name, mastery_percentage, status, next_review_at')
        .eq('user_id', userId)
        .order('mastery_percentage', { ascending: false });

      if (subject) {
        query = query.eq('subject', subject);
      }

      const { data, error } = await query;
      if (error) throw error;

      if (!data || data.length === 0) {
        return [
          { name: 'Stokes’ Theorem in 3D', mastery: 88, status: 'In Review' },
          { name: 'Divergence Theorem', mastery: 74, status: 'Up Next' },
          { name: 'Line Integrals & Green’s Theorem', mastery: 95, status: 'Mastered' },
        ];
      }

      return data.map((d) => ({
        id: d.id,
        name: d.topic_name,
        mastery: d.mastery_percentage,
        status: d.status,
        nextReviewAt: d.next_review_at,
      }));
    } catch (err) {
      console.warn('Failed to load topic mastery:', err);
      return [
        { name: 'Stokes’ Theorem in 3D', mastery: 88, status: 'In Review' },
        { name: 'Divergence Theorem', mastery: 74, status: 'Up Next' },
        { name: 'Line Integrals & Green’s Theorem', mastery: 95, status: 'Mastered' },
      ];
    }
  },
};

export default conversationService;
