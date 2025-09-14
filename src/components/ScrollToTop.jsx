import { useEffect, useState } from 'react';
import { ArrowUp } from 'lucide-react';

export default function ScrollToTop() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const toggleVisibility = () => {
      if (window.scrollY > 400) setVisible(true);
      else setVisible(false);
    };

    window.addEventListener('scroll', toggleVisibility);
    return () => window.removeEventListener('scroll', toggleVisibility);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  return (
    visible && (
      <button
        onClick={scrollToTop}
        className="fixed bottom-6 right-6 z-50 p-3 rounded-full
                   bg-[#2c026d]/90
                   shadow-[0_0_15px] shadow-[#3b0ca3]/80
                   hover:shadow-[#a0ff7b]/80
                   hover:scale-110 transition-transform duration-300"
      >
        <ArrowUp className="text-lime-400 w-5 h-5" />
      </button>
    )
  );
}
