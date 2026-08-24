import React, { useState, useEffect, useRef, useCallback } from 'react';
import * as tf from '@tensorflow/tfjs';
import * as cocoSsd from '@tensorflow-models/coco-ssd';
import * as mobilenet from '@tensorflow-models/mobilenet';
import { 
  Camera, 
  Image as ImageIcon, 
  Upload, 
  Play, 
  Pause, 
  Zap, 
  Activity, 
  Sliders, 
  AlertCircle, 
  Eye,
  Tag,
  Scan,
  RefreshCw
} from 'lucide-react';

const SAMPLE_IMAGES = [
  {
    id: 'bengal-tiger',
    name: 'Bengal Tiger (Wildlife)',
    url: 'https://images.unsplash.com/photo-1534188753412-3e26d0d618d6?w=800&q=80',
    desc: 'Royal Bengal Tiger (Panthera tigris)'
  },
  {
    id: 'african-lion',
    name: 'African Lion',
    url: 'https://images.unsplash.com/photo-1546182990-dffeafbe841d?w=800&q=80',
    desc: 'Male African Lion in Grassland'
  },
  {
    id: 'golden-retriever',
    name: 'Golden Retriever',
    url: 'https://images.unsplash.com/photo-1552053831-71594a27632d?w=800&q=80',
    desc: 'Golden Retriever Canine Breed'
  },
  {
    id: 'workstation',
    name: 'Developer Desk',
    url: 'https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=800&q=80',
    desc: 'Laptop, Screen, Coffee Cup, Keyboard'
  },
  {
    id: 'city-street',
    name: 'Urban Street',
    url: 'https://images.unsplash.com/photo-1519501025264-65ba15a82390?w=800&q=80',
    desc: 'Cars, People, Buildings, Traffic'
  }
];

export default function VisionLabApp() {
  const [activeTab, setActiveTab] = useState('sample'); // 'webcam' | 'sample'
  const [modelMode, setModelMode] = useState('mobilenet'); // 'mobilenet' | 'coco'

  // Loaded Models State
  const [cocoModel, setCocoModel] = useState(null);
  const [mobilenetModel, setMobilenetModel] = useState(null);
  const [modelLoading, setModelLoading] = useState(true);
  const [modelError, setModelError] = useState(null);

  // Webcam & Detection State
  const [isDetecting, setIsDetecting] = useState(true);
  const [cameraActive, setCameraActive] = useState(false);
  const [cameraError, setCameraError] = useState(null);

  // Telemetry Metrics
  const [fps, setFps] = useState(0);
  const [inferenceTime, setInferenceTime] = useState(0);
  const [cocoDetections, setCocoDetections] = useState([]);
  const [classifications, setClassifications] = useState([]);
  const [confidenceThreshold, setConfidenceThreshold] = useState(0.45);
  const [logs, setLogs] = useState([
    `[${new Date().toLocaleTimeString()}] Initializing TensorFlow.js WebGL GPU engine...`
  ]);

  // Sample Image State
  const [selectedSample, setSelectedSample] = useState(SAMPLE_IMAGES[0]);
  const [customImageSrc, setCustomImageSrc] = useState(null);

  // Refs
  const videoRef = useRef(null);
  const canvasRef = useRef(null);
  const imageRef = useRef(null);
  const animationFrameRef = useRef(null);
  const lastFrameTimeRef = useRef(0);
  const isDetectingRef = useRef(isDetecting);
  const thresholdRef = useRef(confidenceThreshold);
  const modelModeRef = useRef(modelMode);
  const cocoModelRef = useRef(null);
  const mobilenetModelRef = useRef(null);
  const lastDetectionsRef = useRef([]);
  const lastClassificationsRef = useRef([]);
  const isMountedRef = useRef(true);

  useEffect(() => {
    isMountedRef.current = true;
    return () => {
      isMountedRef.current = false;
    };
  }, []);

  useEffect(() => {
    isDetectingRef.current = isDetecting;
  }, [isDetecting]);

  useEffect(() => {
    thresholdRef.current = confidenceThreshold;
  }, [confidenceThreshold]);

  useEffect(() => {
    modelModeRef.current = modelMode;
  }, [modelMode]);

  const addLog = useCallback((msg) => {
    if (!isMountedRef.current) return;
    setLogs((prev) => [`[${new Date().toLocaleTimeString()}] ${msg}`, ...prev.slice(0, 49)]);
  }, []);

  // 1. Initialize TensorFlow.js and Load Models (MobileNet & COCO-SSD)
  const initModels = useCallback(async () => {
    try {
      setModelLoading(true);
      setModelError(null);
      addLog('TensorFlow.js initializing backend...');
      
      try {
        await tf.ready();
      } catch (tfErr) {
        console.warn('tf.ready() warning:', tfErr);
      }

      const backend = tf.getBackend();
      addLog(`TensorFlow.js backend active: ${(backend || 'CPU').toUpperCase()}`);

      // 1. Load MobileNet (1,000 ImageNet Classes)
      try {
        addLog('Loading MobileNet (ImageNet 1,000 Species)...');
        const loadedMobilenet = await mobilenet.load({ version: 2, alpha: 1.0 });
        if (isMountedRef.current) {
          mobilenetModelRef.current = loadedMobilenet;
          setMobilenetModel(loadedMobilenet);
          addLog('MobileNet 1,000-class classifier ready in memory.');
        }
      } catch (mobErr) {
        console.warn('MobileNet load warning:', mobErr);
        addLog(`MobileNet load warning: ${mobErr?.message || 'Network delay'}`);
      }

      // 2. Load COCO-SSD (80 Object Detection BBoxes)
      try {
        addLog('Loading COCO-SSD (MobileNetV2 Object Bounding Boxes)...');
        const loadedCoco = await cocoSsd.load({ base: 'mobilenet_v2' });
        if (isMountedRef.current) {
          cocoModelRef.current = loadedCoco;
          setCocoModel(loadedCoco);
          addLog('COCO-SSD object detector ready in memory.');
        }
      } catch (cocoErr) {
        console.warn('COCO-SSD load warning:', cocoErr);
        addLog(`COCO-SSD load warning: ${cocoErr?.message || 'Network delay'}`);
      }

      if (isMountedRef.current) {
        setModelLoading(false);
      }
    } catch (err) {
      console.error('Fatal error loading TensorFlow models:', err);
      if (isMountedRef.current) {
        setModelError(err?.message || 'Failed to initialize TensorFlow engine');
        setModelLoading(false);
        addLog(`ERROR: ${err?.message || 'Initialization failed'}`);
      }
    }
  }, [addLog]);

  useEffect(() => {
    initModels();
  }, [initModels]);

  // 2. Start & Stop Webcam Stream Safely
  const startCamera = useCallback(async () => {
    try {
      setCameraError(null);
      addLog('Requesting webcam access (MediaDevices API)...');
      
      if (!navigator?.mediaDevices?.getUserMedia) {
        throw new Error('MediaDevices API not supported in this browser context.');
      }

      const stream = await navigator.mediaDevices.getUserMedia({
        video: { width: { ideal: 640 }, height: { ideal: 480 }, facingMode: 'user' },
        audio: false
      });

      if (videoRef.current && isMountedRef.current) {
        videoRef.current.srcObject = stream;
        videoRef.current.onloadedmetadata = () => {
          if (videoRef.current) {
            videoRef.current.play().catch((e) => console.warn('Video play interrupted:', e));
            if (isMountedRef.current) {
              setCameraActive(true);
              addLog('Webcam stream started successfully.');
            }
          }
        };
      }
    } catch (err) {
      console.warn('Camera access error:', err);
      if (isMountedRef.current) {
        setCameraError(err?.message || 'Webcam access was denied or unavailable in this browser context.');
        setCameraActive(false);
        addLog('Webcam access unavailable. Using "Sample Images" mode.');
      }
    }
  }, [addLog]);

  const stopCamera = useCallback(() => {
    try {
      if (videoRef.current && videoRef.current.srcObject) {
        const stream = videoRef.current.srcObject;
        if (stream.getTracks) {
          stream.getTracks().forEach((track) => {
            try { track.stop(); } catch { /* ignore */ }
          });
        }
        videoRef.current.srcObject = null;
      }
    } catch (e) {
      console.warn('Error stopping camera:', e);
    }
    if (isMountedRef.current) {
      setCameraActive(false);
    }
    if (animationFrameRef.current) {
      cancelAnimationFrame(animationFrameRef.current);
      animationFrameRef.current = null;
    }
  }, []);

  useEffect(() => {
    if (activeTab === 'webcam' && (mobilenetModel || cocoModel) && !modelLoading) {
      startCamera();
    } else {
      stopCamera();
    }

    return () => {
      stopCamera();
    };
  }, [activeTab, mobilenetModel, cocoModel, modelLoading, startCamera, stopCamera]);

  // 3. Draw Bounding Boxes with Precise Display Scaling & Null Checks
  const drawBoundingBoxes = useCallback((predictions, element) => {
    try {
      const canvas = canvasRef.current;
      if (!canvas || !element) return;
      const ctx = canvas.getContext('2d');
      if (!ctx) return;

      if (!Array.isArray(predictions)) return;

      // Determine original natural resolution vs. rendered client dimensions
      const naturalWidth = element.naturalWidth || element.videoWidth || element.width || 1;
      const naturalHeight = element.naturalHeight || element.videoHeight || element.height || 1;
      const displayedWidth = element.clientWidth || element.offsetWidth || naturalWidth || 640;
      const displayedHeight = element.clientHeight || element.offsetHeight || naturalHeight || 480;

      if (displayedWidth <= 0 || displayedHeight <= 0) return;

      // Ensure canvas resolution matches display size precisely
      if (canvas.width !== displayedWidth || canvas.height !== displayedHeight) {
        canvas.width = displayedWidth;
        canvas.height = displayedHeight;
      }

      // Scaling factors (ratio of displayed dimensions vs original image resolution)
      const scaleX = naturalWidth > 0 ? displayedWidth / naturalWidth : 1;
      const scaleY = naturalHeight > 0 ? displayedHeight / naturalHeight : 1;

      ctx.clearRect(0, 0, displayedWidth, displayedHeight);

      predictions.forEach((pred) => {
        if (!pred || !pred.bbox || pred.score < thresholdRef.current) return;

        const [origX = 0, origY = 0, origW = 0, origH = 0] = pred.bbox;
        const x = origX * scaleX;
        const y = origY * scaleY;
        const w = origW * scaleX;
        const h = origH * scaleY;

        const scorePercent = Math.round((pred.score || 0) * 100);
        const color = (pred.score || 0) > 0.8 ? '#E95420' : (pred.score || 0) > 0.65 ? '#10B981' : '#3B82F6';

        // Outer Bounding Box
        ctx.strokeStyle = color;
        ctx.lineWidth = 2.5;
        ctx.strokeRect(x, y, w, h);

        // Corner Brackets HUD
        const cornerLength = Math.min(w * 0.2, 16);
        ctx.lineWidth = 3.5;
        ctx.strokeStyle = '#FFFFFF';
        
        ctx.beginPath();
        ctx.moveTo(x, y + cornerLength); ctx.lineTo(x, y); ctx.lineTo(x + cornerLength, y);
        ctx.stroke();

        ctx.beginPath();
        ctx.moveTo(x + w - cornerLength, y); ctx.lineTo(x + w); ctx.lineTo(x + w, y + cornerLength);
        ctx.stroke();

        ctx.beginPath();
        ctx.moveTo(x, y + h - cornerLength); ctx.lineTo(x, y + h); ctx.lineTo(x + cornerLength, y + h);
        ctx.stroke();

        ctx.beginPath();
        ctx.moveTo(x + w - cornerLength, y + h); ctx.lineTo(x + w); ctx.lineTo(x + w, y + h - cornerLength);
        ctx.stroke();

        // Label background pill
        const labelText = `${(pred.class || 'OBJECT').toUpperCase()} ${scorePercent}%`;
        ctx.font = 'bold 11px Inter, sans-serif';
        const textWidth = ctx.measureText(labelText).width;
        const labelHeight = 18;

        ctx.fillStyle = 'rgba(0, 0, 0, 0.85)';
        ctx.fillRect(x, y > 22 ? y - labelHeight - 4 : y + 4, textWidth + 14, labelHeight);

        ctx.fillStyle = color;
        ctx.fillRect(x, y > 22 ? y - labelHeight - 4 : y + 4, 3, labelHeight);

        // Label text
        ctx.fillStyle = '#FFFFFF';
        ctx.fillText(labelText, x + 7, y > 22 ? y - 8 : y + 17);
      });
    } catch (err) {
      console.error('Error in drawBoundingBoxes:', err);
    }
  }, []);

  // 4. Draw HUD Overlay for MobileNet (Species & Image Classification Mode)
  const drawClassificationHUD = useCallback((preds, element) => {
    try {
      const canvas = canvasRef.current;
      if (!canvas || !element) return;
      const ctx = canvas.getContext('2d');
      if (!ctx) return;

      const displayedWidth = element.clientWidth || element.offsetWidth || element.width || 640;
      const displayedHeight = element.clientHeight || element.offsetHeight || element.height || 480;

      if (displayedWidth <= 0 || displayedHeight <= 0) return;

      if (canvas.width !== displayedWidth || canvas.height !== displayedHeight) {
        canvas.width = displayedWidth;
        canvas.height = displayedHeight;
      }

      ctx.clearRect(0, 0, displayedWidth, displayedHeight);

      if (preds && preds.length > 0) {
        const margin = 16;
        const bracketLen = 28;
        ctx.lineWidth = 3;
        ctx.strokeStyle = '#E95420';

        // Top-Left
        ctx.beginPath();
        ctx.moveTo(margin, margin + bracketLen); ctx.lineTo(margin, margin); ctx.lineTo(margin + bracketLen, margin);
        ctx.stroke();

        // Top-Right
        ctx.beginPath();
        ctx.moveTo(displayedWidth - margin - bracketLen, margin); ctx.lineTo(displayedWidth - margin, margin); ctx.lineTo(displayedWidth - margin, margin + bracketLen);
        ctx.stroke();

        // Bottom-Left
        ctx.beginPath();
        ctx.moveTo(margin, displayedHeight - margin - bracketLen); ctx.lineTo(margin, displayedHeight - margin); ctx.lineTo(margin + bracketLen, displayedHeight - margin);
        ctx.stroke();

        // Bottom-Right
        ctx.beginPath();
        ctx.moveTo(displayedWidth - margin - bracketLen, displayedHeight - margin); ctx.lineTo(displayedWidth - margin, displayedHeight - margin); ctx.lineTo(displayedWidth - margin, displayedHeight - margin - bracketLen);
        ctx.stroke();
      }
    } catch (err) {
      console.error('Error in drawClassificationHUD:', err);
    }
  }, []);

  // 5. Continuous Real-Time Webcam Inference Loop
  const runWebcamInference = useCallback(async () => {
    if (!videoRef.current || !isDetectingRef.current) {
      animationFrameRef.current = requestAnimationFrame(runWebcamInference);
      return;
    }

    const video = videoRef.current;
    if (video.readyState === 4) {
      const startTime = performance.now();

      try {
        if (modelModeRef.current === 'mobilenet' && mobilenetModelRef.current) {
          // MobileNet Classification
          const predictions = await mobilenetModelRef.current.classify(video, 5);
          const endTime = performance.now();
          const latency = Math.round(endTime - startTime);
          
          if (isMountedRef.current) {
            setInferenceTime(latency);
            const now = performance.now();
            const delta = (now - lastFrameTimeRef.current) / 1000;
            lastFrameTimeRef.current = now;
            if (delta > 0) setFps(Math.round(1 / delta));

            const safePreds = predictions || [];
            setClassifications(safePreds);
            lastClassificationsRef.current = safePreds;
            drawClassificationHUD(safePreds, video);
          }
        } else if (modelModeRef.current === 'coco' && cocoModelRef.current) {
          // COCO-SSD Object Detection
          const predictions = await cocoModelRef.current.detect(video);
          const endTime = performance.now();
          const latency = Math.round(endTime - startTime);

          if (isMountedRef.current) {
            setInferenceTime(latency);
            const now = performance.now();
            const delta = (now - lastFrameTimeRef.current) / 1000;
            lastFrameTimeRef.current = now;
            if (delta > 0) setFps(Math.round(1 / delta));

            const safePreds = predictions || [];
            const filtered = safePreds.filter((p) => (p?.score || 0) >= thresholdRef.current);
            setCocoDetections(filtered);
            lastDetectionsRef.current = filtered;
            drawBoundingBoxes(filtered, video);
          }
        }
      } catch (err) {
        console.warn('Frame inference exception caught:', err);
      }
    }

    animationFrameRef.current = requestAnimationFrame(runWebcamInference);
  }, [drawBoundingBoxes, drawClassificationHUD]);

  useEffect(() => {
    if (activeTab === 'webcam' && cameraActive && (mobilenetModel || cocoModel)) {
      animationFrameRef.current = requestAnimationFrame(runWebcamInference);
    }

    return () => {
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
        animationFrameRef.current = null;
      }
    };
  }, [activeTab, cameraActive, mobilenetModel, cocoModel, runWebcamInference]);

  // 6. Static Image Inference with Complete Exception Handling
  const runStaticImageInference = useCallback(async (imageElement) => {
    if (!imageElement) return;

    try {
      const startTime = performance.now();

      if (modelMode === 'mobilenet') {
        if (!mobilenetModelRef.current) {
          addLog('MobileNet model is initializing. Please wait...');
          return;
        }
        addLog(`Classifying species with MobileNet (ImageNet 1k)...`);
        const predictions = await mobilenetModelRef.current.classify(imageElement, 5);
        const endTime = performance.now();
        const latency = Math.round(endTime - startTime);

        if (isMountedRef.current) {
          setInferenceTime(latency);
          setFps(Math.round(1000 / Math.max(latency, 1)));
          const safePreds = predictions || [];
          setClassifications(safePreds);
          lastClassificationsRef.current = safePreds;
          drawClassificationHUD(safePreds, imageElement);

          if (safePreds.length > 0 && safePreds[0]?.className) {
            addLog(`Predicted: ${safePreds[0].className} (${Math.round((safePreds[0].probability || 0) * 100)}%) in ${latency}ms`);
          }
        }
      } else if (modelMode === 'coco') {
        if (!cocoModelRef.current) {
          addLog('COCO-SSD detector is initializing. Please wait...');
          return;
        }
        addLog(`Detecting object bounding boxes with COCO-SSD...`);
        const predictions = await cocoModelRef.current.detect(imageElement);
        const endTime = performance.now();
        const latency = Math.round(endTime - startTime);

        if (isMountedRef.current) {
          setInferenceTime(latency);
          setFps(Math.round(1000 / Math.max(latency, 1)));
          const safePreds = predictions || [];
          const filtered = safePreds.filter((p) => (p?.score || 0) >= thresholdRef.current);
          setCocoDetections(filtered);
          lastDetectionsRef.current = filtered;
          drawBoundingBoxes(filtered, imageElement);

          addLog(`Detected ${filtered.length} objects with COCO-SSD in ${latency}ms.`);
        }
      }
    } catch (err) {
      console.error('Image inference error caught:', err);
      addLog(`Inference issue: ${err?.message || 'Could not process image'}`);
    }
  }, [modelMode, drawBoundingBoxes, drawClassificationHUD, addLog]);

  const handleImageLoad = (e) => {
    try {
      if (e?.target) {
        runStaticImageInference(e.target);
      }
    } catch (err) {
      console.warn('handleImageLoad error:', err);
    }
  };

  const handleFileUpload = (e) => {
    try {
      const file = e?.target?.files?.[0];
      if (file) {
        const reader = new FileReader();
        reader.onload = (event) => {
          if (isMountedRef.current && event?.target?.result) {
            setCustomImageSrc(event.target.result);
            setSelectedSample(null);
            addLog(`Loaded local image: ${file.name}`);
          }
        };
        reader.readAsDataURL(file);
      }
    } catch (err) {
      console.warn('handleFileUpload error:', err);
      addLog('Failed to read uploaded image file.');
    }
  };

  // Re-run inference when switching model modes in sample view
  useEffect(() => {
    if (activeTab === 'sample' && imageRef.current && (mobilenetModel || cocoModel)) {
      runStaticImageInference(imageRef.current);
    }
  }, [modelMode, activeTab, mobilenetModel, cocoModel, runStaticImageInference]);

  // Re-draw bounding boxes when confidence threshold changes or on resize
  useEffect(() => {
    if (activeTab === 'sample' && imageRef.current) {
      if (modelMode === 'coco' && lastDetectionsRef.current?.length > 0) {
        drawBoundingBoxes(lastDetectionsRef.current, imageRef.current);
      }
    }
  }, [confidenceThreshold, activeTab, modelMode, drawBoundingBoxes]);

  useEffect(() => {
    const handleResize = () => {
      if (activeTab === 'sample' && imageRef.current) {
        if (modelMode === 'coco' && lastDetectionsRef.current?.length > 0) {
          drawBoundingBoxes(lastDetectionsRef.current, imageRef.current);
        } else if (modelMode === 'mobilenet' && lastClassificationsRef.current?.length > 0) {
          drawClassificationHUD(lastClassificationsRef.current, imageRef.current);
        }
      }
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [activeTab, modelMode, drawBoundingBoxes, drawClassificationHUD]);

  return (
    <div className="w-full h-full flex flex-col bg-[#121212] text-white select-none font-sans overflow-hidden">
      {/* 1. Top Controls Header */}
      <div className="h-14 bg-[#1E1E1E] border-b border-white/10 px-4 flex items-center justify-between shrink-0 gap-2 overflow-x-auto">
        {/* Left: Feed Modes (Webcam vs Sample) */}
        <div className="flex items-center gap-2 shrink-0">
          <button
            onClick={() => setActiveTab('sample')}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold flex items-center gap-1.5 transition-all ${
              activeTab === 'sample'
                ? 'bg-ubuntu-orange text-white shadow-lg shadow-ubuntu-orange/20'
                : 'bg-white/5 text-white/70 hover:bg-white/10 hover:text-white'
            }`}
          >
            <ImageIcon className="w-3.5 h-3.5" />
            <span>Sample Images</span>
          </button>

          <button
            onClick={() => setActiveTab('webcam')}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold flex items-center gap-1.5 transition-all ${
              activeTab === 'webcam'
                ? 'bg-ubuntu-orange text-white shadow-lg shadow-ubuntu-orange/20'
                : 'bg-white/5 text-white/70 hover:bg-white/10 hover:text-white'
            }`}
          >
            <Camera className="w-3.5 h-3.5" />
            <span>Live Webcam</span>
          </button>
        </div>

        {/* Center: Model Architecture Toggle */}
        <div className="flex items-center gap-1 bg-black/50 p-1 rounded-xl border border-white/10 shrink-0">
          <button
            onClick={() => setModelMode('mobilenet')}
            className={`px-3 py-1 rounded-lg text-xs font-medium flex items-center gap-1.5 transition-all ${
              modelMode === 'mobilenet'
                ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/40 shadow-sm font-bold'
                : 'text-white/60 hover:text-white'
            }`}
            title="ImageNet 1,000 Species & Object Classifier (Tiger, Lion, Leopard, etc.)"
          >
            <Tag className="w-3 h-3" />
            <span>Wildlife / MobileNet (1k)</span>
          </button>

          <button
            onClick={() => setModelMode('coco')}
            className={`px-3 py-1 rounded-lg text-xs font-medium flex items-center gap-1.5 transition-all ${
              modelMode === 'coco'
                ? 'bg-ubuntu-orange/20 text-ubuntu-orange border border-ubuntu-orange/40 shadow-sm font-bold'
                : 'text-white/60 hover:text-white'
            }`}
            title="COCO-SSD Bounding Box Object Detection (80 common everyday objects)"
          >
            <Scan className="w-3 h-3" />
            <span>Object Detect / COCO (80)</span>
          </button>
        </div>

        {/* Right: Controls & Threshold */}
        <div className="flex items-center gap-3 text-xs shrink-0">
          {modelMode === 'coco' && (
            <div className="hidden sm:flex items-center gap-2 bg-white/5 px-3 py-1.5 rounded-lg border border-white/10">
              <Sliders className="w-3.5 h-3.5 text-ubuntu-orange" />
              <span className="text-white/70 text-[11px]">Threshold:</span>
              <input
                type="range"
                min="0.2"
                max="0.9"
                step="0.05"
                value={confidenceThreshold}
                onChange={(e) => setConfidenceThreshold(parseFloat(e.target.value))}
                className="w-16 accent-ubuntu-orange cursor-pointer"
              />
              <span className="font-mono font-bold text-[11px] text-white">
                {Math.round(confidenceThreshold * 100)}%
              </span>
            </div>
          )}

          {activeTab === 'webcam' && (
            <button
              onClick={() => setIsDetecting((prev) => !prev)}
              className={`p-2 rounded-lg transition-colors ${
                isDetecting
                  ? 'bg-emerald-500/20 text-emerald-400 hover:bg-emerald-500/30'
                  : 'bg-amber-500/20 text-amber-400 hover:bg-amber-500/30'
              }`}
              title={isDetecting ? 'Pause Inference' : 'Resume Inference'}
            >
              {isDetecting ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
            </button>
          )}
        </div>
      </div>

      {/* 2. Main Workstation Area */}
      <div className="flex-1 flex flex-col lg:flex-row overflow-hidden relative">
        {/* Left/Center: Canvas & Viewport */}
        <div className="flex-1 bg-black/60 flex flex-col items-center justify-center p-4 overflow-hidden relative">
          {/* Loading Neural Network Overlay */}
          {modelLoading && (
            <div className="absolute inset-0 bg-[#121212]/90 backdrop-blur-md z-30 flex flex-col items-center justify-center space-y-4">
              <div className="w-12 h-12 rounded-2xl bg-ubuntu-orange/20 border border-ubuntu-orange/40 flex items-center justify-center animate-pulse">
                <Zap className="w-6 h-6 text-ubuntu-orange animate-bounce-subtle" />
              </div>
              <div className="text-center space-y-1">
                <h3 className="text-sm font-bold text-white">Loading Neural Networks...</h3>
                <p className="text-xs text-white/60 font-mono">Initializing MobileNet 1k Species & COCO-SSD</p>
              </div>
            </div>
          )}

          {/* Model Error Overlay */}
          {modelError && (
            <div className="absolute inset-0 bg-red-950/80 backdrop-blur-md z-30 flex flex-col items-center justify-center p-6 text-center space-y-3">
              <AlertCircle className="w-10 h-10 text-red-400" />
              <h3 className="text-sm font-bold text-white">Model Initialization Notice</h3>
              <p className="text-xs text-red-200/80 max-w-sm">{modelError}</p>
              <button
                onClick={initModels}
                className="px-4 py-2 bg-ubuntu-orange hover:bg-ubuntu-orange-hover text-white rounded-xl text-xs font-semibold flex items-center gap-2 shadow-lg transition-all"
              >
                <RefreshCw className="w-3.5 h-3.5" />
                <span>Retry Model Load</span>
              </button>
            </div>
          )}

          {/* TAB 1: Sample Images & Upload Viewport */}
          {activeTab === 'sample' && (
            <div className="w-full h-full flex flex-col items-center justify-between space-y-4">
              <div className="relative flex-1 w-full max-w-2xl bg-[#181818] rounded-2xl overflow-hidden border border-white/15 shadow-2xl flex items-center justify-center p-2">
                <div className="relative max-w-full max-h-full flex items-center justify-center overflow-hidden rounded-xl">
                  <img
                    ref={imageRef}
                    src={customImageSrc || selectedSample?.url}
                    alt={selectedSample?.name || 'Uploaded Sample'}
                    crossOrigin="anonymous"
                    onLoad={handleImageLoad}
                    onError={() => addLog('Network note: Sample image could not be loaded from remote CDN.')}
                    className="max-w-full max-h-[440px] w-auto h-auto object-contain rounded-xl block"
                  />
                  <canvas
                    ref={canvasRef}
                    className="absolute inset-0 w-full h-full pointer-events-none rounded-xl"
                  />

                  {/* Top Species Prediction Badge for MobileNet */}
                  {modelMode === 'mobilenet' && classifications.length > 0 && (
                    <div className="absolute top-3 left-3 bg-black/80 backdrop-blur-md border border-emerald-500/40 px-3 py-1.5 rounded-xl flex items-center gap-2 shadow-2xl animate-fade-in pointer-events-none">
                      <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                      <span className="text-xs font-bold text-white uppercase tracking-wide">
                        {classifications[0]?.className?.split(',')?.[0] || 'Unknown'}
                      </span>
                      <span className="text-xs font-mono font-bold text-emerald-400">
                        {Math.round((classifications[0]?.probability || 0) * 100)}%
                      </span>
                    </div>
                  )}
                </div>
              </div>

              {/* Sample Preset Carousel & Upload Bar */}
              <div className="w-full max-w-2xl flex items-center gap-2.5 overflow-x-auto pb-1">
                <label className="shrink-0 flex items-center gap-1.5 px-3 py-2 bg-white/10 hover:bg-white/15 border border-white/15 rounded-xl cursor-pointer text-xs font-medium transition-colors">
                  <Upload className="w-3.5 h-3.5 text-ubuntu-orange" />
                  <span>Upload</span>
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleFileUpload}
                    className="hidden"
                  />
                </label>

                {SAMPLE_IMAGES.map((sample) => (
                  <button
                    key={sample.id}
                    onClick={() => {
                      setCustomImageSrc(null);
                      setSelectedSample(sample);
                    }}
                    className={`shrink-0 px-3 py-2 rounded-xl text-xs font-medium flex items-center gap-1.5 transition-all border ${
                      !customImageSrc && selectedSample?.id === sample.id
                        ? 'bg-ubuntu-orange/20 border-ubuntu-orange text-white font-bold'
                        : 'bg-[#1e1e1e] border-white/10 text-white/70 hover:bg-white/10 hover:text-white'
                    }`}
                  >
                    <Eye className="w-3 h-3 text-ubuntu-orange" />
                    <span>{sample.name}</span>
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* TAB 2: Live Webcam Viewport */}
          {activeTab === 'webcam' && (
            <div className="relative w-full max-w-2xl aspect-video bg-[#181818] rounded-2xl overflow-hidden border border-white/15 shadow-2xl flex items-center justify-center p-2">
              <div className="relative w-full h-full flex items-center justify-center rounded-xl overflow-hidden">
                <video
                  ref={videoRef}
                  autoPlay
                  playsInline
                  muted
                  className="w-full h-full object-contain rounded-xl block"
                />
                <canvas
                  ref={canvasRef}
                  className="absolute inset-0 w-full h-full pointer-events-none rounded-xl"
                />

                {!cameraActive && !modelLoading && (
                  <div className="absolute inset-0 bg-black/80 backdrop-blur-sm flex flex-col items-center justify-center p-6 text-center space-y-3">
                    <Camera className="w-10 h-10 text-white/40" />
                    <p className="text-xs text-white/70 max-w-sm">
                      {cameraError || 'Webcam is initializing or permissions were not granted.'}
                    </p>
                    <button
                      onClick={startCamera}
                      className="px-4 py-2 rounded-xl bg-ubuntu-orange hover:bg-ubuntu-orange-hover text-white text-xs font-semibold shadow-lg transition-all"
                    >
                      Grant Camera Access
                    </button>
                  </div>
                )}

                {/* Viewport Live Badge HUD */}
                {cameraActive && (
                  <div className="absolute top-3 left-3 bg-black/70 backdrop-blur-md border border-white/10 px-2.5 py-1 rounded-md flex items-center gap-2 text-[10px] font-mono pointer-events-none">
                    <span className="w-2 h-2 rounded-full bg-red-500 animate-ping" />
                    <span className="font-bold text-red-400">LIVE FEED</span>
                  </div>
                )}

                {/* Top Prediction Badge for MobileNet in Webcam Feed */}
                {modelMode === 'mobilenet' && classifications.length > 0 && (
                  <div className="absolute top-3 right-3 bg-black/80 backdrop-blur-md border border-emerald-500/40 px-3 py-1.5 rounded-xl flex items-center gap-2 shadow-2xl animate-fade-in pointer-events-none">
                    <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                    <span className="text-xs font-bold text-white uppercase tracking-wide">
                      {classifications[0]?.className?.split(',')?.[0] || 'Unknown'}
                    </span>
                    <span className="text-xs font-mono font-bold text-emerald-400">
                      {Math.round((classifications[0]?.probability || 0) * 100)}%
                    </span>
                  </div>
                )}
              </div>
            </div>
          )}
        </div>

        {/* Right: Telemetry & Classification Sidebar */}
        <aside className="w-full lg:w-80 bg-[#1A1A1A] border-t lg:border-t-0 lg:border-l border-white/10 p-4 flex flex-col space-y-4 overflow-y-auto shrink-0">
          {/* Telemetry Grid */}
          <div className="grid grid-cols-2 gap-2.5">
            <div className="bg-[#242424] border border-white/10 p-3 rounded-xl">
              <div className="text-[10px] text-white/50 font-medium flex items-center gap-1.5">
                <Activity className="w-3 h-3 text-emerald-400" />
                <span>INFERENCE</span>
              </div>
              <div className="text-lg font-bold font-mono text-emerald-400 mt-1">
                {inferenceTime} <span className="text-xs text-white/60 font-sans">ms</span>
              </div>
            </div>

            <div className="bg-[#242424] border border-white/10 p-3 rounded-xl">
              <div className="text-[10px] text-white/50 font-medium flex items-center gap-1.5">
                <Zap className="w-3 h-3 text-cyan-400" />
                <span>FRAMERATE</span>
              </div>
              <div className="text-lg font-bold font-mono text-cyan-400 mt-1">
                {fps} <span className="text-xs text-white/60 font-sans">FPS</span>
              </div>
            </div>
          </div>

          {/* Model Architecture Specs */}
          <div className="bg-[#242424] border border-white/10 p-3 rounded-xl space-y-2 text-xs">
            <div className="text-[11px] font-bold text-white/90 flex items-center justify-between">
              <span>Model Specs</span>
              <span className={`px-2 py-0.5 rounded text-[9px] font-mono font-bold ${
                modelMode === 'mobilenet' 
                  ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30'
                  : 'bg-ubuntu-orange/20 text-ubuntu-orange border border-ubuntu-orange/30'
              }`}>
                {modelMode === 'mobilenet' ? 'MobileNet (ImageNet 1k)' : 'COCO-SSD (80 Objects)'}
              </span>
            </div>
            <div className="space-y-1 font-mono text-[10px] text-white/60">
              <div className="flex justify-between">
                <span>Domain:</span>
                <span className="text-white">
                  {modelMode === 'mobilenet' ? '1,000 Species & Objects' : '80 Common Objects'}
                </span>
              </div>
              <div className="flex justify-between">
                <span>Task:</span>
                <span className="text-white">
                  {modelMode === 'mobilenet' ? 'Image / Species Classification' : 'Bounding Box Localization'}
                </span>
              </div>
              <div className="flex justify-between">
                <span>Backend:</span>
                <span className="text-ubuntu-orange">TensorFlow.js WebGL</span>
              </div>
            </div>
          </div>

          {/* Predictions / Detections List */}
          <div className="flex-1 bg-[#242424] border border-white/10 p-3 rounded-xl flex flex-col space-y-2 min-h-[160px]">
            <div className="text-[11px] font-bold text-white flex items-center justify-between">
              <span>
                {modelMode === 'mobilenet' ? 'Top Predicted Classes' : 'Detected Bounding Boxes'}
              </span>
              <span className="text-[10px] font-mono text-ubuntu-orange font-bold">
                {modelMode === 'mobilenet' ? `${classifications.length} classes` : `${cocoDetections.length} objects`}
              </span>
            </div>

            <div className="flex-1 overflow-y-auto space-y-2.5 pr-1 max-h-48">
              {modelMode === 'mobilenet' ? (
                classifications.length === 0 ? (
                  <div className="h-full flex items-center justify-center text-xs text-white/40 italic py-6">
                    Running MobileNet inference...
                  </div>
                ) : (
                  classifications.map((item, index) => {
                    const percent = Math.round((item?.probability || 0) * 100);
                    const primaryName = item?.className?.split(',')?.[0] || 'Species';
                    const altNames = item?.className?.split(',')?.slice(1)?.join(',') || '';

                    return (
                      <div key={index} className="space-y-1">
                        <div className="flex justify-between text-xs font-mono">
                          <span className="text-white font-semibold capitalize truncate max-w-[170px]" title={item?.className}>
                            {index === 0 && <span className="text-emerald-400 mr-1">★</span>}
                            {primaryName}
                          </span>
                          <span className="text-emerald-400 font-bold">{percent}%</span>
                        </div>
                        {altNames && (
                          <div className="text-[9px] text-white/40 truncate italic font-sans">
                            {altNames}
                          </div>
                        )}
                        <div className="w-full h-1.5 bg-white/10 rounded-full overflow-hidden">
                          <div
                            style={{ width: `${percent}%` }}
                            className={`h-full rounded-full ${
                              index === 0
                                ? 'bg-gradient-to-r from-emerald-500 to-teal-400'
                                : 'bg-gradient-to-r from-ubuntu-orange to-amber-400'
                            }`}
                          />
                        </div>
                      </div>
                    );
                  })
                )
              ) : (
                cocoDetections.length === 0 ? (
                  <div className="h-full flex items-center justify-center text-xs text-white/40 italic py-6">
                    No objects detected above threshold
                  </div>
                ) : (
                  cocoDetections.map((det, index) => {
                    const scorePercent = Math.round((det?.score || 0) * 100);
                    return (
                      <div key={index} className="space-y-1">
                        <div className="flex justify-between text-xs font-mono">
                          <span className="text-white capitalize font-semibold">{det?.class || 'Object'}</span>
                          <span className="text-emerald-400 font-bold">{scorePercent}%</span>
                        </div>
                        <div className="w-full h-1.5 bg-white/10 rounded-full overflow-hidden">
                          <div
                            style={{ width: `${scorePercent}%` }}
                            className="h-full bg-gradient-to-r from-ubuntu-orange to-emerald-400 rounded-full"
                          />
                        </div>
                      </div>
                    );
                  })
                )
              )}
            </div>
          </div>

          {/* Terminal Console Log */}
          <div className="h-28 bg-black/60 border border-white/10 rounded-xl p-2.5 font-mono text-[10px] text-green-400 overflow-y-auto flex flex-col-reverse space-y-reverse space-y-1">
            {logs.map((log, i) => (
              <div key={i} className="truncate text-white/70">
                {log}
              </div>
            ))}
          </div>
        </aside>
      </div>
    </div>
  );
}
