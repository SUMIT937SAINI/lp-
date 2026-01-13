
import React, { useState, useEffect } from 'react';
import { 
  ShoppingBag, 
  CheckCircle, 
  ShieldCheck, 
  Zap, 
  MessageSquare, 
  ChevronRight, 
  Star, 
  Clock, 
  Activity,
  User,
  AlertCircle,
  Menu,
  X,
  Phone,
  Flame,
  ArrowRight,
  Sparkles,
  Heart,
  Truck,
  RotateCcw,
  Award
} from 'lucide-react';
import { GoogleGenAI } from "@google/genai";

// --- Components ---

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: "होम", href: "#home" },
    { name: "विज्ञान", href: "#science" },
    { name: "सामग्री", href: "#ingredients" },
    { name: "उपयोग विधि", href: "#how-to-use" },
    { name: "समीक्षाएं", href: "#reviews" }
  ];

  return (
    <nav className={`fixed w-full z-[100] transition-all duration-500 ${scrolled ? 'bg-white/95 backdrop-blur-md shadow-xl py-2' : 'bg-transparent py-5'}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center">
          <div className="flex items-center group cursor-pointer">
            <div className="bg-primary p-2 rounded-xl mr-3 group-hover:rotate-12 transition-all shadow-lg shadow-primary/20">
              <Flame className="text-white" size={24} />
            </div>
            <div>
              <span className="text-2xl font-black tracking-tighter text-primary block leading-none">धुरंधर</span>
              <span className="text-[10px] font-bold text-accent uppercase tracking-[0.2em]">आयुर्वेद</span>
            </div>
          </div>
          
          <div className="hidden lg:flex items-center space-x-10">
            {navLinks.map((link) => (
              <a key={link.name} href={link.href} className="text-sm font-bold text-gray-700 hover:text-primary transition-colors relative group">
                {link.name}
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-accent transition-all group-hover:w-full"></span>
              </a>
            ))}
            <button className="bg-primary text-white px-8 py-3 rounded-2xl text-sm font-bold shadow-xl shadow-primary/30 hover:shadow-primary/50 hover:-translate-y-0.5 transition-all active:scale-95 flex items-center gap-2">
              अभी खरीदें <ArrowRight size={16} />
            </button>
          </div>

          <button onClick={() => setIsOpen(!isOpen)} className="lg:hidden p-2 text-primary hover:bg-gray-100 rounded-xl transition-colors">
            {isOpen ? <X size={28} /> : <Menu size={28} />}
          </button>
        </div>
      </div>
      
      {/* Mobile Sidebar */}
      <div className={`fixed inset-0 bg-gray-900/60 backdrop-blur-sm z-[110] transition-opacity duration-300 lg:hidden ${isOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'}`} onClick={() => setIsOpen(false)}>
        <div className={`absolute right-0 top-0 h-full w-4/5 bg-white p-8 shadow-2xl transition-transform duration-500 ${isOpen ? 'translate-x-0' : 'translate-x-full'}`} onClick={e => e.stopPropagation()}>
          <div className="flex justify-between items-center mb-12">
            <span className="text-2xl font-black text-primary">मेनू</span>
            <button onClick={() => setIsOpen(false)} className="p-2 bg-gray-100 rounded-full"><X size={20}/></button>
          </div>
          <div className="flex flex-col space-y-6">
            {navLinks.map((link) => (
              <a key={link.name} href={link.href} onClick={() => setIsOpen(false)} className="text-xl font-bold text-gray-800 border-b border-gray-100 pb-4">{link.name}</a>
            ))}
            <button className="w-full bg-primary text-white py-5 rounded-3xl text-xl font-bold mt-8 shadow-2xl shadow-primary/20">अभी ऑर्डर करें</button>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default function App() {
  const [aiInput, setAiInput] = useState('');
  const [aiLoading, setAiLoading] = useState(false);
  const [aiResponse, setAiResponse] = useState<string | null>(null);

  const handleAiConsult = async () => {
    if (!aiInput.trim()) return;
    setAiLoading(true);
    try {
      const ai = new GoogleGenAI({ apiKey: process.env.API_KEY || '' });
      const result = await ai.models.generateContent({
        model: "gemini-3-flash-preview",
        contents: `User says: ${aiInput}. Context: Joint pain oil. Language: Hindi. Provide a warm, short Ayurvedic advice highlighting natural ingredients. Disclaimer: Not medical advice.`,
      });
      setAiResponse(result.text || null);
    } catch (e) {
      setAiResponse("क्षमा करें, सलाह प्राप्त करने में त्रुटि हुई।");
    } finally {
      setAiLoading(false);
    }
  };

  return (
    <div className="bg-white selection:bg-accent selection:text-white scroll-smooth">
      <Navbar />
      
      {/* HERO */}
      <section id="home" className="relative min-h-screen flex items-center pt-20 overflow-hidden bg-[radial-gradient(circle_at_top_right,_var(--tw-gradient-stops))] from-primary/5 via-white to-white">
        <div className="max-w-7xl mx-auto px-4 grid lg:grid-cols-2 gap-12 items-center">
          <div className="relative z-10 space-y-8">
            <div className="inline-flex items-center gap-3 bg-white border border-gray-100 px-5 py-2 rounded-full shadow-sm animate-bounce-slow">
              <Award className="text-accent" size={18} />
              <span className="text-xs font-black uppercase tracking-widest text-gray-500">आयुष मंत्रालय द्वारा प्रमाणित</span>
            </div>
            <h1 className="text-6xl lg:text-8xl font-black text-gray-900 leading-[0.9] tracking-tighter">
              जोड़ों के दर्द को <br/> कहें <span className="text-primary italic underline decoration-accent/30 decoration-8 underline-offset-4">अलविदा।</span>
            </h1>
            <p className="text-xl text-gray-600 max-w-lg leading-relaxed">
              पुराने दर्द, सूजन और जकड़न के लिए भारत का सबसे भरोसेमंद 100% आयुर्वेदिक तेल। आज ही अपनी गतिशीलता वापस पाएं।
            </p>
            <div className="flex flex-col sm:flex-row gap-5">
              <button className="bg-primary text-white px-10 py-5 rounded-[2rem] text-xl font-black shadow-2xl shadow-primary/30 hover:shadow-primary/50 hover:-translate-y-1 transition-all flex items-center justify-center gap-3 group">
                अभी ऑर्डर करें <ChevronRight className="group-hover:translate-x-1 transition-transform" />
              </button>
              <button className="bg-white border-2 border-gray-100 text-gray-700 px-10 py-5 rounded-[2rem] text-xl font-bold hover:bg-gray-50 transition-all flex items-center justify-center gap-3">
                <Phone size={20} className="text-accent" /> 1800-200-500
              </button>
            </div>
            <div className="flex items-center gap-8 pt-4">
              <div className="flex -space-x-3">
                {[1,2,3,4].map(i => <img key={i} src={`https://i.pravatar.cc/100?img=${i+10}`} className="w-12 h-12 rounded-full border-4 border-white shadow-sm" />)}
              </div>
              <p className="text-sm font-bold text-gray-400">1.2 लाख+ <span className="text-gray-900">संतुष्ट ग्राहक</span></p>
            </div>
          </div>
          
          <div className="relative">
            <div className="absolute -inset-10 bg-primary/10 rounded-full blur-[100px] animate-pulse"></div>
            <div className="relative bg-white p-8 rounded-[4rem] shadow-2xl border border-gray-50 transform lg:rotate-3 hover:rotate-0 transition-all duration-700 group">
              <img src="https://images.unsplash.com/photo-1612277795421-9bc7706a4a34?q=80&w=2070&auto=format&fit=crop" className="w-full aspect-[4/5] object-cover rounded-[3rem] mb-8 shadow-inner" alt="Dhurandar Product" />
              <div className="absolute -top-6 -right-6 bg-accent text-white p-6 rounded-3xl shadow-2xl rotate-12 font-black text-center">
                <div className="text-xs uppercase tracking-widest mb-1">छूट</div>
                <div className="text-3xl">33%</div>
              </div>
              <div className="flex justify-between items-end px-4">
                <div>
                  <h3 className="text-3xl font-black text-primary mb-2">धुरंधर ऑयल</h3>
                  <div className="flex items-center gap-2">
                    <div className="flex text-yellow-400">
                      {[1,2,3,4,5].map(i => <Star key={i} size={14} fill="currentColor" />)}
                    </div>
                    <span className="text-xs font-black text-gray-400 uppercase">4.9 स्टार रेटिंग</span>
                  </div>
                </div>
                <div className="text-right">
                  <span className="text-gray-400 line-through text-lg">₹899</span>
                  <div className="text-5xl font-black text-primary">₹599</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* TRUST BADGES */}
      <div className="bg-white py-12 border-y border-gray-100">
        <div className="max-w-7xl mx-auto px-4 flex flex-wrap justify-between items-center gap-8 grayscale opacity-50 hover:grayscale-0 hover:opacity-100 transition-all duration-500">
          <div className="flex items-center gap-3 font-black text-sm uppercase tracking-widest"><Truck size={24}/> फ्री डिलीवरी</div>
          <div className="flex items-center gap-3 font-black text-sm uppercase tracking-widest"><RotateCcw size={24}/> 7-दिन वापसी</div>
          <div className="flex items-center gap-3 font-black text-sm uppercase tracking-widest"><ShieldCheck size={24}/> GMP प्रमाणित</div>
          <div className="flex items-center gap-3 font-black text-sm uppercase tracking-widest"><Activity size={24}/> लैब टेस्टेड</div>
        </div>
      </div>

      {/* SCIENCE */}
      <section id="science" className="py-32 bg-gray-50 relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 grid lg:grid-cols-2 gap-20 items-center">
          <div className="order-2 lg:order-1 relative">
            <div className="grid grid-cols-2 gap-6">
              <div className="bg-white p-10 rounded-[3rem] shadow-xl shadow-gray-200/50 space-y-4 translate-y-12">
                <div className="w-14 h-14 bg-green-50 text-green-600 rounded-2xl flex items-center justify-center"><Zap size={28}/></div>
                <h4 className="text-xl font-bold">वात शामक</h4>
                <p className="text-sm text-gray-500 leading-relaxed">आयुर्वेद के अनुसार 80% जोड़ों का दर्द शरीर में 'वात' बढ़ने से होता है। हमारा तेल इसे तुरंत संतुलित करता है।</p>
              </div>
              <div className="bg-white p-10 rounded-[3rem] shadow-xl shadow-gray-200/50 space-y-4">
                <div className="w-14 h-14 bg-blue-50 text-blue-600 rounded-2xl flex items-center justify-center"><Heart size={28}/></div>
                <h4 className="text-xl font-bold">शक्तिवर्धक</h4>
                <p className="text-sm text-gray-500 leading-relaxed">यह केवल दर्द नहीं रोकता, बल्कि मांसपेशियों और हड्डियों को अंदर से मजबूती प्रदान करता है।</p>
              </div>
            </div>
          </div>
          <div className="order-1 lg:order-2 space-y-8">
            <h2 className="text-5xl font-black text-gray-900 leading-tight">प्राचीन आयुर्वेद का <br/><span className="text-primary italic">शक्तिशाली</span> प्रभाव।</h2>
            <p className="text-lg text-gray-600 leading-relaxed">
              धुरंधर तेल 18 दुर्लभ जड़ी-बूटियों का एक ऐसा मिश्रण है जिसे 'सिद्ध तेल' विधि से 72 घंटों तक पकाया जाता है। यह त्वचा की सात परतों को पार कर सीधे हड्डियों और जोड़ों तक पहुँचता है।
            </p>
            <ul className="space-y-4">
              {["तुरंत अवशोषण (Fast Absorption)", "दीर्घकालिक राहत", "100% केमिकल मुक्त"].map(item => (
                <li key={item} className="flex items-center gap-3 font-bold text-gray-800">
                  <CheckCircle className="text-primary" size={20} /> {item}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* AI ADVISOR */}
      <section id="advisor" className="py-32 bg-primary relative overflow-hidden">
        <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-white/5 rounded-full blur-[150px] -translate-y-1/2 translate-x-1/2"></div>
        <div className="max-w-7xl mx-auto px-4 relative z-10 grid lg:grid-cols-2 gap-20 items-center">
          <div className="text-white space-y-8">
            <div className="inline-flex items-center gap-2 bg-white/10 px-4 py-2 rounded-full border border-white/10 text-xs font-bold uppercase tracking-widest text-accent">
              <Sparkles size={16} /> स्मार्ट आयुर्वेद सहायक
            </div>
            <h2 className="text-6xl font-black leading-tight tracking-tighter">अपने दर्द के लिए <br/> सही <span className="italic underline decoration-accent underline-offset-8">सलाह</span> पाएं।</h2>
            <p className="text-xl text-white/70">हमारे AI सलाहकार से पूछें कि धुरंधर आपकी समस्या में कैसे मदद कर सकता है।</p>
          </div>
          
          <div className="bg-white p-2 rounded-[3.5rem] shadow-2xl">
            <div className="bg-gray-50 rounded-[3rem] p-10">
              <h4 className="text-2xl font-black mb-6 text-gray-900">नि:शुल्क परामर्श</h4>
              <textarea 
                value={aiInput}
                onChange={(e) => setAiInput(e.target.value)}
                placeholder="उदा: मुझे सुबह उठने पर घुटनों में जकड़न महसूस होती है..."
                className="w-full h-40 bg-white border border-gray-100 rounded-[2rem] p-6 focus:ring-4 focus:ring-primary/5 focus:border-primary outline-none transition-all resize-none text-lg"
              />
              <button 
                onClick={handleAiConsult}
                disabled={aiLoading}
                className="w-full bg-primary text-white py-6 rounded-[2rem] text-xl font-bold mt-6 shadow-xl shadow-primary/20 flex items-center justify-center gap-3 hover:scale-[1.02] active:scale-95 transition-all disabled:opacity-50"
              >
                {aiLoading ? <div className="w-6 h-6 border-4 border-white/20 border-t-white rounded-full animate-spin"></div> : <MessageSquare />}
                {aiLoading ? 'सलाह तैयार की जा रही है...' : 'सलाह प्राप्त करें'}
              </button>
              
              {aiResponse && (
                <div className="mt-10 p-8 bg-primary/5 rounded-[2.5rem] border border-primary/10 animate-in fade-in slide-in-from-top-4">
                  <p className="text-gray-800 leading-relaxed italic text-lg">"{aiResponse}"</p>
                  <div className="mt-4 text-[10px] font-black text-gray-400 uppercase tracking-widest flex items-center gap-2">
                    <ShieldCheck size={12}/> AI जेनरेटेड सुझाव
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* FINAL CTA */}
      <section className="py-32 px-4 bg-white">
        <div className="max-w-7xl mx-auto bg-[#1a4d2e] rounded-[5rem] p-20 text-center text-white relative overflow-hidden shadow-[0_50px_100px_-20px_rgba(26,77,46,0.4)]">
          <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/pinstripe.png')] opacity-10"></div>
          <div className="relative z-10 max-w-3xl mx-auto space-y-12">
            <h2 className="text-5xl md:text-7xl font-black leading-tight tracking-tighter">आज ही दर्द मुक्त <br/> जीवन की ओर <span className="text-accent italic">पहला कदम</span> बढ़ाएं।</h2>
            <div className="flex flex-col sm:flex-row gap-6 justify-center">
              <button className="bg-white text-primary px-12 py-7 rounded-[2.5rem] text-2xl font-black shadow-2xl hover:scale-105 transition-all">ऑर्डर करें - 33% ऑफ</button>
              <button className="bg-accent text-white px-12 py-7 rounded-[2.5rem] text-2xl font-black shadow-2xl hover:scale-105 transition-all">व्हाट्सएप पर संपर्क</button>
            </div>
            <p className="text-white/40 text-sm font-bold uppercase tracking-[0.3em]">ऑफर केवल आज रात तक उपलब्ध है</p>
          </div>
        </div>
      </section>

      <footer className="bg-gray-900 text-white py-24">
        <div className="max-w-7xl mx-auto px-4 grid md:grid-cols-4 gap-16">
          <div className="col-span-2 space-y-8">
            <h3 className="text-4xl font-black tracking-tighter">धुरंधर आयुर्वेद</h3>
            <p className="text-gray-400 text-lg max-w-sm">शुद्ध हिमालयी जड़ी-बूटियों और आधुनिक तकनीक का संगम। जोड़ों के दर्द का स्थायी समाधान।</p>
          </div>
          <div className="space-y-6">
            <h4 className="text-accent font-black uppercase tracking-widest text-xs">सहयोग</h4>
            <ul className="space-y-4 text-gray-400 font-bold">
              <li className="hover:text-white transition-colors cursor-pointer">ऑर्डर ट्रैक करें</li>
              <li className="hover:text-white transition-colors cursor-pointer">वापसी नीति</li>
              <li className="hover:text-white transition-colors cursor-pointer">सहायता केंद्र</li>
            </ul>
          </div>
          <div className="space-y-6">
            <h4 className="text-accent font-black uppercase tracking-widest text-xs">मुख्यालय</h4>
            <p className="text-gray-400 text-sm font-bold leading-relaxed">Skinrange Ayurveda Ltd.<br/>नई दिल्ली, भारत</p>
          </div>
        </div>
      </footer>

      {/* MOBILE BAR */}
      <div className="lg:hidden fixed bottom-0 left-0 w-full p-4 bg-white/80 backdrop-blur-xl border-t border-gray-100 z-[200] flex gap-4 animate-in slide-in-from-bottom-full duration-500">
        <button className="flex-[3] bg-primary text-white py-5 rounded-3xl font-black text-xl shadow-2xl shadow-primary/20 active:scale-95 transition-all">अभी खरीदें - ₹599</button>
        <button className="flex-1 bg-accent text-white rounded-3xl flex items-center justify-center shadow-2xl shadow-accent/20"><ShoppingBag /></button>
      </div>
    </div>
  );
}
