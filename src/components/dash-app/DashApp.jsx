import { useState, useEffect } from 'react';
import { useAuth } from '../auth/AuthContext';
import { Sidebar } from './Sidebar';
import { Header } from './Header';
import { ChatView } from './ChatView';
import { InputBar } from './InputBar';
import { StudyPlanModal } from './StudyPlanModal';
import { CONVERSATIONS as DEFAULT_CONVERSATIONS } from './conversations';
import { conversationService } from '../../services/conversationService';
import { chatbotService } from '../../services/chatbotService';

export const DashApp = ({ onSignOut }) => {
  const { user, signOut } = useAuth();
  const handleSignOut = onSignOut || signOut;

  const [conversations, setConversations] = useState(DEFAULT_CONVERSATIONS);
  const [activeChatId, setActiveChatId] = useState(DEFAULT_CONVERSATIONS[0].id);
  const [activeNav, setActiveNav] = useState('home');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [studyPlanOpen, setStudyPlanOpen] = useState(false);

  // Per-conversation follow-up message storage
  const [followUpsByChat, setFollowUpsByChat] = useState({});
  const [isThinking, setIsThinking] = useState(false);

  // 1. Fetch user's conversations from Supabase
  const userId = user?.id;

  useEffect(() => {
    let isCancelled = false;

    if (!userId) {
      return;
    }

    const fetchConvs = async () => {
      try {
        const data = await conversationService.getUserConversations(userId);
        if (isCancelled || !data || data.length === 0) return;

        const merged = data.map((item) => {
          const defaultMatch = DEFAULT_CONVERSATIONS.find(
            (dc) => dc.title.toLowerCase() === item.title.toLowerCase()
          );
          return {
            ...item,
            ...(defaultMatch || {}),
            id: item.id,
            title: item.title,
            subject: item.subject || defaultMatch?.subject || 'General',
            topic: item.topic || defaultMatch?.topic || item.title,
            is_bookmarked: item.is_bookmarked ?? false,
          };
        });

        setConversations(merged);
        setActiveChatId((prev) => (merged.some((c) => c.id === prev) ? prev : merged[0].id));
      } catch (err) {
        console.warn('Failed to load conversations from database:', err);
      }
    };

    fetchConvs();

    return () => {
      isCancelled = true;
    };
  }, [userId]);

  // Current active conversation
  const currentChat =
    conversations.find((c) => c.id === activeChatId) || conversations[0] || DEFAULT_CONVERSATIONS[0];

  const currentFollowUps = followUpsByChat[activeChatId] || [];

  // 2. Load message history when selecting a conversation
  useEffect(() => {
    if (!activeChatId || !user?.id) return;

    // Check if UUID
    const isUuid = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i.test(activeChatId);
    if (!isUuid) return;

    const fetchHistory = async () => {
      try {
        const msgs = await conversationService.getMessages(activeChatId);
        if (msgs && msgs.length > 2) {
          // The first 2 messages represent initial query and tutor synthesis
          // Remaining messages are follow-ups
          const followUps = msgs.slice(2).map((m) => ({
            id: m.id,
            role: m.role === 'assistant' ? 'tutor' : 'user',
            text: m.content,
            time: new Date(m.created_at).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
            feedback: m.feedback,
          }));
          setFollowUpsByChat((prev) => ({
            ...prev,
            [activeChatId]: followUps,
          }));
        }
      } catch (err) {
        console.warn('Failed to fetch messages for thread:', err);
      }
    };

    fetchHistory();
  }, [activeChatId, user?.id]);

  const handleSendMessage = async (text) => {
    const timeStr = new Date().toLocaleTimeString([], {
      hour: '2-digit',
      minute: '2-digit',
    });

    const userMsg = {
      role: 'user',
      text,
      time: timeStr,
    };

    // Append user message immediately to UI
    setFollowUpsByChat((prev) => ({
      ...prev,
      [activeChatId]: [...(prev[activeChatId] || []), userMsg],
    }));

    setIsThinking(true);

    // Persist user message to Supabase if authenticated and UUID chat
    const isUuid = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i.test(activeChatId);
    if (user?.id && isUuid) {
      await conversationService.saveMessage({
        conversationId: activeChatId,
        senderId: user.id,
        role: 'user',
        content: text,
      });
    }

    // 1. Try sending to the FastAPI microservice
    try {
      const apiResponse = await chatbotService.sendMessage({
        conversationId: isUuid ? activeChatId : null,
        message: text,
      });

      if (apiResponse?.message) {
        const tutorMsg = {
          role: 'tutor',
          text: apiResponse.message,
          time: new Date().toLocaleTimeString([], {
            hour: '2-digit',
            minute: '2-digit',
          }),
        };

        setFollowUpsByChat((prev) => ({
          ...prev,
          [activeChatId]: [...(prev[activeChatId] || []), tutorMsg],
        }));
        setIsThinking(false);

        // If UUID chat, save assistant response to Supabase
        if (user?.id && isUuid) {
          await conversationService.saveMessage({
            conversationId: activeChatId,
            role: 'assistant',
            content: apiResponse.message,
          });
        }
        return;
      }
    } catch (microserviceErr) {
      console.warn('Microservice unavailable or offline, using fallback Socratic engine:', microserviceErr.message);
    }

    // 2. Intelligent Socratic Fallback (if microservice server is offline or booting)
    setTimeout(async () => {
      let replyText;
      const lower = text.toLowerCase();

      if (currentChat?.title?.toLowerCase().includes('stokes') || activeChatId === 'stokes') {
        if (lower.includes('curl') || lower.includes('boundary')) {
          replyText =
            'Excellent insight. The curl ∇ × F measures the infinitesimal rotation at each point on the surface. When you sum these micro-vorticities over the entire surface S, interior cancelations leave only the net boundary flow along C. This is why Stokes’ Theorem can be viewed as an extension of Green’s Theorem to arbitrary 3D manifolds.';
        } else {
          replyText =
            'Let’s test your intuition: If you traverse the boundary curve C according to the right-hand rule with your thumb aligned with the surface normal vector dS, how does the circulation of F relate to the net vortex flux passing through S?';
        }
      } else if (currentChat?.title?.toLowerCase().includes('quicksort') || activeChatId === 'quicksort') {
        if (lower.includes('pivot') || lower.includes('partition')) {
          replyText =
            'Precisely. With randomized pivot selection or median-of-three, the probability of selecting an extreme element at every recursion level becomes 1/n!, which is practically negligible. The expected height of the recursion tree remains 2 ln n ≈ 1.39 log₂ n, cementing average-case O(n log n).';
        } else {
          replyText =
            'Consider the recurrence relation T(n) = T(n-1) + O(n). When expanded, this yields n + (n-1) + ... + 1 = n(n+1)/2 = O(n²). How does choosing the median of three elements (first, middle, last) fundamentally disrupt this worst-case degeneration?';
        }
      } else if (currentChat?.title?.toLowerCase().includes('bayes') || activeChatId === 'bayes') {
        if (lower.includes('prior') || lower.includes('false positive')) {
          replyText =
            'Spot on. This is the Classic Base Rate Fallacy. Even with a 99% accurate test, if a condition affects 1 in 10,000 people, the raw number of false positives (1% of 9,999 ≈ 100) will still outnumber the true positives (~1). High precision alone is not enough when priors are minuscule.';
        } else {
          replyText =
            'Consider 10,000 individuals tested for a 1% prevalence condition with 95% sensitivity and 95% specificity: 100 actually have it (95 true positives), while 9,900 do not (495 false positives). What fraction of positive tests actually represent true illness?';
        }
      } else if (currentChat?.title?.toLowerCase().includes('thermo') || activeChatId === 'thermo') {
        if (lower.includes('entropy') || lower.includes('reversible')) {
          replyText =
            'Exactly. A reversible process keeps the total entropy change of the universe at zero (ΔS_universe = 0), while every spontaneous, irreversible process increases it (ΔS_universe > 0). This is why a drop of ink disperses in water but never spontaneously coalesces back into a droplet.';
        } else {
          replyText =
            'The First Law tells us energy is conserved, meaning a hot cup of coffee cooling down is allowed, but so would be a cool cup spontaneously heating up by absorbing heat from the room. Why does only the Second Law rule out the latter?';
        }
      } else {
        replyText =
          'That is a great follow-up question. Let’s break it down into fundamental first principles: what is the core assumption being made here, and what happens at the boundary condition?';
      }

      const tutorMsg = {
        role: 'tutor',
        text: replyText,
        time: new Date().toLocaleTimeString([], {
          hour: '2-digit',
          minute: '2-digit',
        }),
      };

      setFollowUpsByChat((prev) => ({
        ...prev,
        [activeChatId]: [...(prev[activeChatId] || []), tutorMsg],
      }));
      setIsThinking(false);

      // Persist assistant message to Supabase
      if (user?.id && isUuid) {
        await conversationService.saveMessage({
          conversationId: activeChatId,
          role: 'assistant',
          content: replyText,
        });
      }
    }, 700);
  };

  const handleNewChat = async () => {
    if (!user?.id) {
      setActiveChatId(conversations[0]?.id || 'stokes');
      return;
    }

    try {
      const newTitle = `Topic Study #${conversations.length + 1}`;
      const newConv = await conversationService.createConversation(user.id, {
        title: newTitle,
        subject: 'General Science',
        topic: 'Fundamental Principles',
      });

      if (newConv) {
        const fullNewConv = {
          ...newConv,
          userQuery: 'How can I master this concept from first principles?',
          userTime: 'Just now',
          introText: 'Welcome! State any equation, theorem, or conceptual difficulty, and I will break it down Socratically with side-by-side formal comparisons.',
          card1: {
            title: 'Definition & Core Premise',
            formula: <span className="font-mono text-sm font-semibold">f(x) : X → Y</span>,
            description: 'Identifies the domains, constraints, and foundational postulates.',
          },
          card2: {
            title: 'Generalization & Bounds',
            formula: <span className="font-mono text-sm font-semibold">lim x → ∞ |f(x)|</span>,
            description: 'Explores boundary conditions and edge-case behavior.',
          },
          keyInsight: 'True understanding emerges from connecting formal mathematical rigor to physical and computational intuition.',
        };

        setConversations((prev) => [fullNewConv, ...prev]);
        setActiveChatId(fullNewConv.id);
      }
    } catch (err) {
      console.warn('Could not create new chat in database:', err);
      setActiveChatId(conversations[0]?.id || 'stokes');
    }
  };

  const handleToggleBookmark = async () => {
    if (!currentChat?.id) return;
    const newStatus = !currentChat.is_bookmarked;
    setConversations((prev) =>
      prev.map((c) => (c.id === currentChat.id ? { ...c, is_bookmarked: newStatus } : c))
    );

    const isUuid = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i.test(currentChat.id);
    if (user?.id && isUuid) {
      await conversationService.toggleBookmark(currentChat.id, currentChat.is_bookmarked);
    }
  };

  return (
    <div className="h-screen w-screen bg-white text-zinc-800 flex overflow-hidden font-sans select-none relative">
      {/* Desktop Sidebar */}
      <div className="hidden md:flex h-full shrink-0">
        <Sidebar
          activeChatId={activeChatId}
          conversations={conversations}
          onSelectChat={setActiveChatId}
          onNewChat={handleNewChat}
          activeNav={activeNav}
          onNavChange={setActiveNav}
          onSignOut={handleSignOut}
        />
      </div>

      {/* Mobile Slide-over Drawer */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 z-50 md:hidden flex">
          {/* Backdrop */}
          <div
            className="fixed inset-0 bg-black/40 backdrop-blur-xs transition-opacity"
            onClick={() => setMobileMenuOpen(false)}
          />
          {/* Drawer */}
          <div className="relative w-72 max-w-[80vw] bg-[#FAFAFA] h-full shadow-2xl z-10 flex flex-col">
            <Sidebar
              activeChatId={activeChatId}
              conversations={conversations}
              onSelectChat={setActiveChatId}
              onNewChat={handleNewChat}
              activeNav={activeNav}
              onNavChange={setActiveNav}
              onSignOut={handleSignOut}
              onCloseMobile={() => setMobileMenuOpen(false)}
            />
          </div>
        </div>
      )}

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col h-full bg-white overflow-hidden min-w-0">
        {/* Header */}
        <Header
          subject={currentChat.subject}
          topic={currentChat.topic}
          isBookmarked={currentChat.is_bookmarked}
          onToggleBookmark={handleToggleBookmark}
          onOpenMobileMenu={() => setMobileMenuOpen(true)}
          onOpenStudyPlan={() => setStudyPlanOpen(true)}
        />

        {/* Interactive Chat / Workbench Area */}
        <ChatView
          conversation={currentChat}
          followUpMessages={currentFollowUps}
          isThinking={isThinking}
        />

        {/* Bottom Follow-Up Question Bar */}
        <InputBar
          onSendMessage={handleSendMessage}
          disabled={isThinking}
        />
      </div>

      {/* Adaptive Study Plan Modal */}
      <StudyPlanModal
        isOpen={studyPlanOpen}
        onClose={() => setStudyPlanOpen(false)}
        currentTopic={currentChat.topic}
      />
    </div>
  );
};

export const LearningConsoleApp = DashApp;
export default DashApp;
