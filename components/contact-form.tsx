"use client";

import { useState } from "react";
import type { SiteConfig } from "@/data/site";
import { Send } from "lucide-react";
import { toast } from "sonner";

interface ContactFormProps {
  site: SiteConfig;
}

export function ContactForm({ site }: ContactFormProps) {
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    company: "",
    type: "Brand Film",
    budget: "상담 후 결정",
    message: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    // ============================================
    // TODO: 실제 폼 전송 연결 방법 (아주 쉬움)
    // 1. https://formspree.io 에서 무료 계정 만들기 (1분)
    // 2. 새 폼 생성 → endpoint 복사 (예: https://formspree.io/f/xxxxx)
    // 3. 아래 fetch 주석 해제하고 YOUR_FORMSPREE_ID 부분 교체
    //    또는 action="https://formspree.io/f/xxxxx" 로 form 태그에 직접 넣어도 됩니다.
    // ============================================

    try {
      // 현재는 데모: 실제로는 아래 코드로 교체
      await new Promise((r) => setTimeout(r, 900)); // 네트워크 지연 시뮬레이션

      // === 실제 Formspree 사용 시 아래 주석 해제 ===
      // const res = await fetch("https://formspree.io/f/YOUR_FORMSPREE_ID", {
      //   method: "POST",
      //   headers: { "Content-Type": "application/json" },
      //   body: JSON.stringify(formData),
      // });
      // if (!res.ok) throw new Error();

      toast.success("문의가 접수되었습니다!", {
        description: "24시간 내에 이메일로 연락드리겠습니다. 감사합니다.",
      });

      // 폼 초기화
      setFormData({
        name: "",
        email: "",
        company: "",
        type: "Brand Film",
        budget: "상담 후 결정",
        message: "",
      });
    } catch {
      toast.error("전송에 실패했습니다.", {
        description: "잠시 후 다시 시도하거나 hello@kimite.studio 로 직접 메일 주세요.",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        <div>
          <label className="block text-xs tracking-widest text-[#71717A] mb-2">이름 *</label>
          <input
            type="text"
            name="name"
            required
            value={formData.name}
            onChange={handleChange}
            className="input w-full px-5 py-3.5 text-base"
            placeholder="홍길동"
          />
        </div>
        <div>
          <label className="block text-xs tracking-widest text-[#71717A] mb-2">이메일 *</label>
          <input
            type="email"
            name="email"
            required
            value={formData.email}
            onChange={handleChange}
            className="input w-full px-5 py-3.5 text-base"
            placeholder="you@company.com"
          />
        </div>
      </div>

      <div>
        <label className="block text-xs tracking-widest text-[#71717A] mb-2">소속 / 브랜드 (선택)</label>
        <input
          type="text"
          name="company"
          value={formData.company}
          onChange={handleChange}
          className="input w-full px-5 py-3.5 text-base"
          placeholder="회사명 또는 프로젝트명"
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        <div>
          <label className="block text-xs tracking-widest text-[#71717A] mb-2">프로젝트 유형</label>
          <select
            name="type"
            value={formData.type}
            onChange={handleChange}
            className="input w-full px-5 py-3.5 text-base appearance-none"
          >
            <option>Brand Film</option>
            <option>Commercial / 광고</option>
            <option>Music Video</option>
            <option>Memorial / 추모영상</option>
            <option>AI 영상 레슨</option>
            <option>기타 (직접 작성)</option>
          </select>
        </div>
        <div>
          <label className="block text-xs tracking-widest text-[#71717A] mb-2">예산 범위</label>
          <select
            name="budget"
            value={formData.budget}
            onChange={handleChange}
            className="input w-full px-5 py-3.5 text-base appearance-none"
          >
            <option>상담 후 결정</option>
            <option>~ 500만원</option>
            <option>500 ~ 1,500만원</option>
            <option>1,500만원 이상</option>
          </select>
        </div>
      </div>

      <div>
        <label className="block text-xs tracking-widest text-[#71717A] mb-2">프로젝트 상세 (참고 영상, 원하는 분위기 등) *</label>
        <textarea
          name="message"
          required
          value={formData.message}
          onChange={handleChange}
          rows={6}
          className="textarea w-full px-5 py-4 text-base resize-y min-h-[140px]"
          placeholder="원하는 영상 스타일, 길이, 사용 목적, 참고 레퍼런스 등을 자유롭게 알려주세요."
        />
      </div>

      <button 
        type="submit" 
        disabled={loading}
        className="btn btn-primary w-full md:w-auto !py-4 px-14 text-base flex items-center justify-center gap-2 disabled:opacity-70"
      >
        {loading ? "전송 중..." : "문의 보내기"}
        {!loading && <Send size={17} />}
      </button>

      <p className="text-xs text-[#71717A] pt-1">
        {site.contact.responseTime} · 직접 메일: <a href={`mailto:${site.contact.email}`} className="underline hover:text-white">{site.contact.email}</a>
      </p>
    </form>
  );
}
