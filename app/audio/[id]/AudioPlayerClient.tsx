"use client";

import { useState, useRef, useEffect } from "react";
import {
  Play,
  Pause,
  Volume2,
  VolumeX,
  Download,
  RotateCcw,
  RotateCw,
  Share2,
  ArrowLeft,
  Music,
  QrCode,
  Check,
} from "lucide-react";
import Link from "next/link";

interface AudioMetadata {
  id: string;
  originalName: string;
  title: string;
  fileUrl: string;
  mimeType: string;
  size: number;
  createdAt: string;
}

export default function AudioPlayerClient({
  metadata,
}: {
  metadata: AudioMetadata;
}) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [volume, setVolume] = useState(1);
  const [isMuted, setIsMuted] = useState(false);
  const [isCopied, setIsCopied] = useState(false);

  const audioRef = useRef<HTMLAudioElement>(null);
  const progressBarRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    const updateTime = () => {
      setCurrentTime(audio.currentTime);
    };

    const updateDuration = () => {
      if (audio.duration && !isNaN(audio.duration) && isFinite(audio.duration)) {
        setDuration(audio.duration);
      }
    };

    const handleEnded = () => {
      setIsPlaying(false);
      setCurrentTime(0);
    };

    audio.addEventListener("timeupdate", updateTime);
    audio.addEventListener("durationchange", updateDuration);
    audio.addEventListener("loadedmetadata", updateDuration);
    audio.addEventListener("ended", handleEnded);

    // If metadata is already loaded (e.g. from cache or preload), update duration immediately
    if (audio.readyState >= 1 && audio.duration && !isNaN(audio.duration) && isFinite(audio.duration)) {
      setDuration(audio.duration);
    }

    return () => {
      audio.removeEventListener("timeupdate", updateTime);
      audio.removeEventListener("durationchange", updateDuration);
      audio.removeEventListener("loadedmetadata", updateDuration);
      audio.removeEventListener("ended", handleEnded);
    };
  }, []);

  const togglePlay = () => {
    if (!audioRef.current) return;
    if (isPlaying) {
      audioRef.current.pause();
      setIsPlaying(false);
    } else {
      audioRef.current
        .play()
        .catch((err) => console.error("Error playing audio:", err));
      setIsPlaying(true);
    }
  };

  const handleSeek = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!audioRef.current) return;
    const newTime = parseFloat(e.target.value);
    audioRef.current.currentTime = newTime;
    setCurrentTime(newTime);
  };

  const toggleMute = () => {
    if (!audioRef.current) return;
    const nextMuted = !isMuted;
    audioRef.current.muted = nextMuted;
    setIsMuted(nextMuted);
  };

  const handleVolumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!audioRef.current) return;
    const newVolume = parseFloat(e.target.value);
    audioRef.current.volume = newVolume;
    setVolume(newVolume);
    if (newVolume > 0 && isMuted) {
      audioRef.current.muted = false;
      setIsMuted(false);
    } else if (newVolume === 0 && !isMuted) {
      audioRef.current.muted = true;
      setIsMuted(true);
    }
  };

  const handleRewind = () => {
    if (!audioRef.current) return;
    audioRef.current.currentTime = Math.max(
      0,
      audioRef.current.currentTime - 10,
    );
  };

  const handleForward = () => {
    if (!audioRef.current) return;
    audioRef.current.currentTime = Math.min(
      duration,
      audioRef.current.currentTime + 10,
    );
  };

  const handleShare = () => {
    navigator.clipboard.writeText(window.location.href);
    setIsCopied(true);
    setTimeout(() => setIsCopied(false), 2000);
  };

  const formatTime = (time: number) => {
    if (isNaN(time)) return "0:00";
    const mins = Math.floor(time / 60);
    const secs = Math.floor(time % 60);
    return `${mins}:${secs.toString().padStart(2, "0")}`;
  };

  const formatFileSize = (bytes: number) => {
    if (bytes === 0) return "0 Bytes";
    const k = 1024;
    const sizes = ["Bytes", "KB", "MB"];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(1)) + " " + sizes[i];
  };

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 selection:bg-indigo-500/30 selection:text-indigo-650 dark:selection:text-indigo-200 relative overflow-hidden flex flex-col justify-between transition-colors duration-300">
      {/* Background Glows */}
      <div className="absolute top-0 left-1/2 h-[500px] w-[500px] -translate-x-1/2 rounded-full bg-indigo-500/5 dark:bg-indigo-500/10 blur-[120px] pointer-events-none" />
      <div className="absolute bottom-0 right-1/4 h-[300px] w-[300px] rounded-full bg-purple-500/5 dark:bg-purple-500/5 blur-[100px] pointer-events-none" />

      {/* Header */}
      <header className="max-w-5xl mx-auto w-full px-4 py-6 relative z-10 flex justify-between items-center">
        <Link
          href="/"
          className="flex items-center gap-2 text-slate-500 dark:text-slate-400 hover:text-slate-800 dark:hover:text-slate-200 transition-colors group text-sm font-medium"
        >
          <ArrowLeft className="h-4 w-4 group-hover:-translate-x-1 transition-transform" />
          <span>Create QR Code</span>
        </Link>
        <span className="text-xs bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-indigo-600 dark:text-indigo-400 px-3 py-1.5 rounded-full font-semibold shadow-sm dark:shadow-none">
          Audio QR Player
        </span>
      </header>

      {/* Main Container */}
      <main className="flex-1 flex items-center justify-center p-4 relative z-10">
        <div className="max-w-md w-full bg-white dark:bg-slate-900/40 border border-slate-200 dark:border-slate-900 rounded-3xl p-6 sm:p-8 backdrop-blur-md shadow-xl dark:shadow-2xl shadow-slate-200/50 dark:shadow-indigo-950/15 flex flex-col items-center transition-all duration-300">
          {/* Audio Element */}
          <audio ref={audioRef} src={metadata.fileUrl} preload="metadata" />

          {/* Album Art / Music Icon with dynamic glow */}
          <div
            className={`relative h-24 w-24 rounded-full bg-gradient-to-tr from-purple-500 to-pink-500 flex items-center justify-center shadow-lg shadow-purple-500/20 mb-6 ${isPlaying ? "animate-pulse" : ""}`}
          >
            <Music className="h-10 w-10 text-white" />

            {/* Visualizer waves */}
            {isPlaying && (
              <div className="absolute inset-0 rounded-full border border-purple-500/40 animate-ping pointer-events-none" />
            )}
          </div>

          {/* Title & Metadata */}
          <h2 className="text-xl font-bold text-center text-slate-850 dark:text-slate-100 line-clamp-1 mb-1">
            {metadata.title}
          </h2>
          <p className="text-xs text-slate-500 dark:text-slate-450 text-center mb-6 line-clamp-1 max-w-[280px]">
            {metadata.originalName} ({formatFileSize(metadata.size)})
          </p>

          {/* Animated soundwaves when playing */}
          <div className="w-full flex items-center justify-center gap-1.5 h-12 mb-6">
            {[...Array(15)].map((_, i) => (
              <div
                key={i}
                className="w-1 bg-gradient-to-t from-purple-500 to-pink-500 rounded-full transition-all duration-150"
                style={{
                  height: isPlaying
                    ? `${Math.max(8, Math.random() * 40)}px`
                    : "8px",
                  animation: isPlaying
                    ? `soundwave-bounce 0.7s infinite alternate ease-in-out`
                    : "none",
                  animationDelay: `${i * 0.05}s`,
                }}
              />
            ))}
          </div>

          {/* Progress Slider */}
          <div className="w-full mb-6">
            <input
              ref={progressBarRef}
              type="range"
              min="0"
              max={duration || 100}
              value={currentTime}
              onChange={handleSeek}
              className="w-full accent-purple-500 cursor-pointer bg-slate-200 dark:bg-slate-800 rounded-lg appearance-none h-1.5 focus:outline-none"
            />
            <div className="flex justify-between text-xs text-slate-500 dark:text-slate-450 mt-2 font-medium">
              <span>{formatTime(currentTime)}</span>
              <span>{formatTime(duration)}</span>
            </div>
          </div>

          {/* Audio Controls */}
          <div className="flex items-center gap-6 mb-8">
            <button
              onClick={handleRewind}
              className="p-3 text-slate-450 dark:text-slate-400 hover:text-slate-800 dark:hover:text-slate-100 hover:bg-slate-100 dark:hover:bg-slate-850 rounded-full transition-all active:scale-95 cursor-pointer"
              title="Rewind 10 seconds"
            >
              <RotateCcw className="h-5 w-5" />
            </button>

            <button
              onClick={togglePlay}
              className="p-5 bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white rounded-full transition-all shadow-lg hover:shadow-purple-500/25 active:scale-95 flex items-center justify-center cursor-pointer"
            >
              {isPlaying ? (
                <Pause className="h-6 w-6 fill-white" />
              ) : (
                <Play className="h-6 w-6 fill-white translate-x-0.5" />
              )}
            </button>

            <button
              onClick={handleForward}
              className="p-3 text-slate-450 dark:text-slate-400 hover:text-slate-800 dark:hover:text-slate-100 hover:bg-slate-100 dark:hover:bg-slate-850 rounded-full transition-all active:scale-95 cursor-pointer"
              title="Forward 10 seconds"
            >
              <RotateCw className="h-5 w-5" />
            </button>
          </div>

          {/* Volume Control */}
          <div className="w-full flex items-center gap-3 bg-slate-50 dark:bg-slate-900/60 border border-slate-200 dark:border-slate-850 rounded-2xl px-4 py-3 mb-6 transition-all">
            <button
              onClick={toggleMute}
              className="text-slate-500 dark:text-slate-400 hover:text-slate-800 dark:hover:text-slate-200 transition-colors cursor-pointer"
            >
              {isMuted ? (
                <VolumeX className="h-4.5 w-4.5" />
              ) : (
                <Volume2 className="h-4.5 w-4.5" />
              )}
            </button>
            <input
              type="range"
              min="0"
              max="1"
              step="0.05"
              value={isMuted ? 0 : volume}
              onChange={handleVolumeChange}
              className="flex-1 accent-purple-500 cursor-pointer bg-slate-200 dark:bg-slate-850 rounded-lg appearance-none h-1 focus:outline-none"
            />
          </div>

          {/* Action Buttons */}
          <div className="w-full grid grid-cols-2 gap-3">
            <a
              href={metadata.fileUrl}
              download={metadata.originalName}
              className="flex items-center justify-center gap-2 py-3 bg-slate-50 dark:bg-slate-900 hover:bg-slate-100 dark:hover:bg-slate-850 border border-slate-200 dark:border-slate-800 text-slate-700 dark:text-slate-200 hover:text-slate-900 dark:hover:text-white rounded-xl text-sm font-semibold transition-all active:scale-98 cursor-pointer"
            >
              <Download className="h-4 w-4" />
              <span>Download</span>
            </a>

            <button
              onClick={handleShare}
              className="flex items-center justify-center gap-2 py-3 bg-slate-50 dark:bg-slate-900 hover:bg-slate-100 dark:hover:bg-slate-850 border border-slate-200 dark:border-slate-800 text-slate-700 dark:text-slate-200 hover:text-slate-900 dark:hover:text-white rounded-xl text-sm font-semibold transition-all active:scale-98 cursor-pointer"
            >
              {isCopied ? (
                <Check className="h-4 w-4 text-green-500" />
              ) : (
                <Share2 className="h-4 w-4" />
              )}
              <span>{isCopied ? "Copied!" : "Share"}</span>
            </button>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="text-center py-6 text-xs text-slate-500 dark:text-slate-400 relative z-10 border-t border-slate-200 dark:border-slate-800 bg-slate-100/60 dark:bg-slate-950/70 backdrop-blur-xl transition-colors duration-300">
        <Link
          href="/"
          className="inline-flex items-center gap-1.5 text-slate-500 hover:text-indigo-600 dark:hover:text-indigo-400 font-medium transition-colors"
        >
          <QrCode className="h-3.5 w-3.5" />
          <span>Create your own QR codes with QR Generator</span>
        </Link>
      </footer>

      {/* CSS Animation for soundwaves */}
      <style jsx global>{`
        @keyframes soundwave-bounce {
          0% {
            transform: scaleY(1);
          }
          100% {
            transform: scaleY(0.15);
          }
        }
      `}</style>
    </div>
  );
}
