"use client";

import React, { useState } from 'react';
import { works as initialWorks, categories, Work } from '@/data/works';

const ADMIN_PASSWORD = "kimite2025"; // 나중에 여기 비밀번호 바꾸세요

export default function AdminPage() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [password, setPassword] = useState("");
  const [works, setWorks] = useState<Work[]>(JSON.parse(JSON.stringify(initialWorks)));
  const [dragIndex, setDragIndex] = useState<number | null>(null);
  const [message, setMessage] = useState("");
  const [pendingFiles, setPendingFiles] = useState<{ name: string; blob: Blob; suggestedPath: string }[]>([]);

  const login = () => {
    if (password === ADMIN_PASSWORD) {
      setIsLoggedIn(true);
      setMessage("로그인 성공! 파일 업로드 시 실제 파일은 수동으로 저장해야 합니다.");
    } else {
      setMessage("비밀번호가 틀렸습니다.");
    }
  };

  // Reorder
  const moveWork = (from: number, to: number) => {
    const newWorks = [...works];
    const [moved] = newWorks.splice(from, 1);
    newWorks.splice(to, 0, moved);
    setWorks(newWorks);
  };

  const onDragStart = (e: React.DragEvent, index: number) => {
    setDragIndex(index);
    e.dataTransfer.effectAllowed = "move";
  };

  const onDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    e.dataTransfer.dropEffect = "move";
  };

  const onDrop = (e: React.DragEvent, dropIndex: number) => {
    e.preventDefault();
    if (dragIndex === null || dragIndex === dropIndex) return;
    moveWork(dragIndex, dropIndex);
    setDragIndex(null);
  };

  const onDragEnd = () => setDragIndex(null);

  const updateWork = (index: number, field: keyof Work, value: any) => {
    const newWorks = [...works];
    (newWorks[index] as any)[field] = value;
    setWorks(newWorks);
  };

  const updateTools = (index: number, value: string) => {
    const newWorks = [...works];
    newWorks[index].tools = value.split(",").map(t => t.trim()).filter(Boolean);
    setWorks(newWorks);
  };

  // 파일 업로드 처리 (미리보기 + 파일 보관)
  const handleFile = (index: number, field: "thumbnail" | "videoUrl", e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const objectUrl = URL.createObjectURL(file);
    const ext = file.name.split(".").pop()?.toLowerCase() || "jpg";
    const safeTitle = works[index].title.toLowerCase().replace(/[^a-z0-9가-힣]/g, "-").slice(0, 40);
    const suggestedName = `${safeTitle}-${Date.now()}.${ext}`;

    const isImage = field === "thumbnail";
    const folder = isImage ? "images/works" : "videos";
    const finalPath = `/${folder}/${suggestedName}`;

    // 데이터에 경로 저장
    updateWork(index, field, finalPath);

    // 실제 파일은 나중에 저장할 수 있게 보관
    const newPending = [...pendingFiles, {
      name: suggestedName,
      blob: file,
      suggestedPath: `public/${folder}/${suggestedName}`
    }];
    setPendingFiles(newPending);

    alert(
      `✅ 파일이 선택되었습니다!\n\n` +
      `파일 이름: ${suggestedName}\n` +
      `저장할 위치: public/${folder}/\n\n` +
      `아래 "Export" 할 때 이 파일들을 다운로드하거나 직접 복사해서 넣어야 합니다.\n` +
      `지금은 미리보기만 가능해요.`
    );

    // 미리보기용 object URL은 여기서는 사용하지 않고, Export 단계에서 처리
  };

  const addNewWork = () => {
    const newWork: Work = {
      id: Date.now(),
      title: "새 작품 제목",
      shortDesc: "짧은 설명을 입력하세요",
      description: "자세한 설명을 여기에 작성하세요.\n여러 줄도 가능합니다.",
      thumbnail: "/images/works/placeholder.jpg",
      videoUrl: "/videos/placeholder.mp4",
      duration: "1:00",
      year: "2025",
      category: "Brand Film",
      tools: ["Runway"],
      role: "Director",
    };
    setWorks([...works, newWork]);
  };

  const deleteWork = (index: number) => {
    if (!confirm("이 작품을 삭제할까요?")) return;
    setWorks(works.filter((_, i) => i !== index));
  };

  // Export: JSON + 파일 다운로드 안내
  const exportData = () => {
    const worksCode = JSON.stringify(works, null, 2);

    const fullCode = `// === data/works.json 내용 전체를 아래로 교체하세요 ===\n` +
      worksCode + `\n\n` +
      `// categories는 그대로 두세요.\n` +
      `export const categories = ${JSON.stringify(categories)} as const;`;

    navigator.clipboard.writeText(fullCode).catch(() => {});

    // pending 파일 다운로드
    if (pendingFiles.length > 0) {
      pendingFiles.forEach((pf) => {
        const url = URL.createObjectURL(pf.blob);
        const a = document.createElement("a");
        a.href = url;
        a.download = pf.name;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        URL.revokeObjectURL(url);
      });
      alert(
        `✅ 데이터 코드가 클립보드에 복사되었습니다.\n\n` +
        `추가로 ${pendingFiles.length}개의 파일이 자동 다운로드 되었습니다.\n\n` +
        `1. data/works.json 파일을 열고 전체 내용을 교체하세요.\n` +
        `2. 다운로드된 파일들을 public/images/works 또는 public/videos 폴더에 넣으세요.\n` +
        `3. start.bat으로 테스트 후 git push 하세요.`
      );
      setPendingFiles([]);
    } else {
      alert(
        "데이터 코드가 클립보드에 복사되었습니다.\n\n" +
        "data/works.json (또는 works.ts)을 열고 붙여넣기 하세요.\n" +
        "파일 업로드가 있었다면 수동으로 public 폴더에 넣어주세요."
      );
    }
  };

  if (!isLoggedIn) {
    return (
      <div className="min-h-screen bg-[#0A0A0F] text-white flex items-center justify-center p-8">
        <div className="max-w-md w-full bg-[#111114] p-8 rounded-2xl border border-[#222228]">
          <h1 className="text-3xl font-bold mb-2">KIMITE STUDIO 관리자</h1>
          <p className="text-[#A1A1AA] mb-6">영상과 작품 정보를 쉽게 수정하세요.</p>

          <input
            type="password"
            placeholder="관리자 비밀번호"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && login()}
            className="w-full bg-[#0A0A0F] border border-[#222228] p-3 rounded-xl mb-4 text-white"
          />
          <button
            onClick={login}
            className="w-full bg-white text-black py-3 rounded-xl font-semibold hover:bg-[#00F0FF] hover:text-black transition"
          >
            로그인
          </button>
          {message && <p className="mt-4 text-sm text-[#A1A1AA]">{message}</p>}
          <p className="mt-8 text-xs text-[#71717A]">
            기본 비밀번호: kimite2025<br />
            (나중에 코드를 열어서 바꾸세요)
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#0A0A0F] text-white p-8">
      <div className="max-w-6xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-4xl font-bold">KIMITE STUDIO 관리자</h1>
            <p className="text-[#A1A1AA]">드래그로 순서 변경 • 파일 업로드 지원 (수동 저장 필요)</p>
          </div>
          <button
            onClick={() => { setIsLoggedIn(false); setPassword(""); }}
            className="px-4 py-2 bg-[#222228] rounded-xl hover:bg-red-500/20"
          >
            로그아웃
          </button>
        </div>

        {message && <div className="mb-6 p-4 bg-[#111114] border border-[#00F0FF] rounded-xl text-sm">{message}</div>}

        <div className="flex gap-4 mb-8">
          <button onClick={addNewWork} className="px-6 py-3 bg-white text-black rounded-xl font-semibold hover:bg-[#00F0FF]">+ 새 작품 추가</button>
          <button onClick={exportData} className="px-8 py-3 bg-[#00F0FF] text-black rounded-xl font-semibold hover:bg-white">Export Changes (코드 + 파일 다운로드)</button>
        </div>

        <div className="space-y-4">
          {works.map((work, index) => (
            <div
              key={work.id}
              draggable
              onDragStart={(e) => onDragStart(e, index)}
              onDragOver={onDragOver}
              onDrop={(e) => onDrop(e, index)}
              onDragEnd={onDragEnd}
              className="bg-[#111114] border border-[#222228] rounded-2xl p-6 flex gap-6 hover:border-[#00F0FF]/50 transition"
            >
              <div className="flex flex-col items-center justify-center gap-1 text-xs text-[#71717A] w-12">
                <button onClick={() => moveWork(index, Math.max(0, index - 1))} className="hover:text-white">↑</button>
                <div className="font-mono">{index + 1}</div>
                <button onClick={() => moveWork(index, Math.min(works.length - 1, index + 1))} className="hover:text-white">↓</button>
                <div className="mt-2 text-[10px] cursor-grab" title="드래그로 이동">⣿</div>
              </div>

              <div className="flex-1 grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-4">
                <div>
                  <label className="text-xs text-[#A1A1AA] block mb-1">제목</label>
                  <input value={work.title} onChange={(e) => updateWork(index, "title", e.target.value)} className="w-full bg-[#0A0A0F] border border-[#222228] p-2 rounded-lg" />
                </div>
                <div>
                  <label className="text-xs text-[#A1A1AA] block mb-1">짧은 설명 (카드용)</label>
                  <input value={work.shortDesc} onChange={(e) => updateWork(index, "shortDesc", e.target.value)} className="w-full bg-[#0A0A0F] border border-[#222228] p-2 rounded-lg" />
                </div>

                <div className="md:col-span-2">
                  <label className="text-xs text-[#A1A1AA] block mb-1">상세 설명 (모달용)</label>
                  <textarea value={work.description} onChange={(e) => updateWork(index, "description", e.target.value)} rows={3} className="w-full bg-[#0A0A0F] border border-[#222228] p-2 rounded-lg" />
                </div>

                <div>
                  <label className="text-xs text-[#A1A1AA] block mb-1">썸네일 이미지</label>
                  <div className="flex gap-2 items-center">
                    <input value={work.thumbnail} onChange={(e) => updateWork(index, "thumbnail", e.target.value)} className="flex-1 bg-[#0A0A0F] border border-[#222228] p-2 rounded-lg text-sm" placeholder="/images/works/파일명.jpg" />
                    <input type="file" accept="image/*" onChange={(e) => handleFile(index, "thumbnail", e)} className="text-xs" />
                  </div>
                  {work.thumbnail && <img src={work.thumbnail} alt="" className="mt-2 h-20 object-cover rounded border border-[#222228]" onError={(e) => (e.currentTarget.style.display = 'none')} />}
                </div>

                <div>
                  <label className="text-xs text-[#A1A1AA] block mb-1">영상 파일 / URL</label>
                  <div className="flex gap-2 items-center">
                    <input value={work.videoUrl} onChange={(e) => updateWork(index, "videoUrl", e.target.value)} className="flex-1 bg-[#0A0A0F] border border-[#222228] p-2 rounded-lg text-sm" placeholder="/videos/파일명.mp4 또는 YouTube/Vimeo 링크" />
                    <input type="file" accept="video/*" onChange={(e) => handleFile(index, "videoUrl", e)} className="text-xs" />
                  </div>
                  <p className="text-[10px] text-[#71717A] mt-1">MP4 직접 파일 추천 (hover 미리보기 가능). 큰 파일은 Vimeo 추천.</p>
                </div>

                <div>
                  <label className="text-xs text-[#A1A1AA] block mb-1">길이</label>
                  <input value={work.duration} onChange={(e) => updateWork(index, "duration", e.target.value)} className="w-full bg-[#0A0A0F] border border-[#222228] p-2 rounded-lg" />
                </div>
                <div>
                  <label className="text-xs text-[#A1A1AA] block mb-1">연도</label>
                  <input value={work.year} onChange={(e) => updateWork(index, "year", e.target.value)} className="w-full bg-[#0A0A0F] border border-[#222228] p-2 rounded-lg" />
                </div>

                <div>
                  <label className="text-xs text-[#A1A1AA] block mb-1">카테고리</label>
                  <select value={work.category} onChange={(e) => updateWork(index, "category", e.target.value as any)} className="w-full bg-[#0A0A0F] border border-[#222228] p-2 rounded-lg">
                    {categories.filter(c => c !== "All").map(cat => <option key={cat} value={cat}>{cat}</option>)}
                  </select>
                </div>

                <div>
                  <label className="text-xs text-[#A1A1AA] block mb-1">역할</label>
                  <input value={work.role || ""} onChange={(e) => updateWork(index, "role", e.target.value)} className="w-full bg-[#0A0A0F] border border-[#222228] p-2 rounded-lg" />
                </div>

                <div className="md:col-span-2">
                  <label className="text-xs text-[#A1A1AA] block mb-1">사용 툴 (쉼표로 구분)</label>
                  <input value={work.tools.join(", ")} onChange={(e) => updateTools(index, e.target.value)} className="w-full bg-[#0A0A0F] border border-[#222228] p-2 rounded-lg" />
                </div>
              </div>

              <div className="flex flex-col justify-between">
                <button onClick={() => deleteWork(index)} className="text-red-400 hover:text-red-500 text-sm">삭제</button>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-10 p-6 bg-[#111114] rounded-2xl border border-[#222228]">
          <h3 className="font-semibold mb-2">저장 방법 (현재 구조의 한계)</h3>
          <ol className="list-decimal list-inside text-sm space-y-1 text-[#A1A1AA]">
            <li>위 "Export Changes" 버튼 클릭 (코드 + 선택한 파일 자동 다운로드)</li>
            <li>다운로드된 파일들을 <code>public/images/works</code> 또는 <code>public/videos</code> 폴더에 넣기</li>
            <li><code>data/works.json</code> (또는 works.ts) 파일 내용 전체를 교체</li>
            <li>start.bat으로 테스트 후 git push</li>
          </ol>
          <p className="text-xs mt-3 text-[#71717A]">
            현재는 정적 사이트라서 파일 업로드가 브라우저에서 바로 저장되지 않습니다. (자세한 설명은 아래)
          </p>
        </div>
      </div>
    </div>
  );
}
