// PlayList.js
import React, { useState, useEffect, useRef } from 'react';
import './PlayList.css';
import { Swiper, SwiperSlide } from 'swiper/react';
import { EffectCoverflow } from 'swiper';
import 'swiper/css';
import 'swiper/css/effect-coverflow';
import { FaPlay, FaPause, FaForward, FaBackward } from 'react-icons/fa';
import { IoLogoYoutube } from 'react-icons/io';

// Importação das músicas
import AP from '../../assets/musicas/AP.mp3';
import CI from '../../assets/musicas/CI.mp3';
import CM from '../../assets/musicas/CM.mp3';
import GTM2 from '../../assets/musicas/GTM2.mp3';
import GTM from '../../assets/musicas/GTM.mp3';
import ECT from '../../assets/musicas/ECT.mp3';
import EM from '../../assets/musicas/EM.mp3';
import EN from '../../assets/musicas/EN.mp3';
import PM from '../../assets/musicas/PM.mp3';

// Importação das imagens
import CapaAP from '../../assets/musicas/capas/AP-CapaAlbum.png';
import CapaCI from '../../assets/musicas/capas/CI-CapaAlbum.png';
import CapaCM from '../../assets/musicas/capas/CM-CapaAlbum.png';
import CapaGTM2 from '../../assets/musicas/capas/GTM2-CapaAlbum.png';
import CapaGTM from '../../assets/musicas/capas/GTM-CapaAlbum.png';
import CapaECT from '../../assets/musicas/capas/ECT-CapaAlbum.png';
import CapaEM from '../../assets/musicas/capas/EM-CapaAlbum.png';
import CapaEN from '../../assets/musicas/capas/EN-CapaAlbum.png';
import CapaPM from '../../assets/musicas/capas/PM-CapaAlbum.png';

const PlayList = () => {
  const [currentSongIndex, setCurrentSongIndex] = useState(3);
  const [isPlaying, setIsPlaying] = useState(false);
  const [progress, setProgress] = useState(0);
  const [duration, setDuration] = useState(0);
  const audioRef = useRef(new Audio());
  const swiperRef = useRef(null);

  const songs = [
    {
      title: 'Legado',
      name: 'Lucyana e Renato',
      source: AP,
      image: CapaAP,
      youtube:
        'https://www.youtube.com/watch?v=hirz0qtqiEM',
    },
    {
      title: 'Gente de Zona',
      name: 'La Gozadera & Marc Anthony',
      source: CI,
      image: CapaCI,
      youtube:
        'https://www.youtube.com/watch?v=VMp55KH_3wo',
    },
    {
      title: 'All Night Long',
      name: 'Lionel Richie',
      source: CM,
      image: CapaCM,
      youtube: 'https://www.youtube.com/watch?v=nqAvFx3NxUM',
    },
    {
      title: 'Shout for Victory',
      name: 'AI Generated',
      source: GTM2,
      image: CapaGTM2,
      youtube:
        'https://www.youtube.com/watch?v=2wQM7sLi4zM',
    },
    {
      title: 'Livin La Vida Loca',
      name: 'Ricky Martin',
      source: GTM,
      image: CapaGTM,
      youtube:
        'https://www.youtube.com/watch?v=p47fEXGabaY',
    },
    {
      title: 'Happy',
      name: 'Pharrell Williams',
      source: ECT,
      image: CapaECT,
      youtube:
        'https://www.youtube.com/watch?v=ZbZSe6N_BXs',
    },
    {
      title: '24K Magic',
      name: 'Bruno Mars',
      source: EM,
      image: CapaEM,
      youtube:
        'https://www.youtube.com/watch?v=UqyT8IEBkvY',
    },
    {
      title: 'All Star',
      name: 'Smash Mouth',
      source: EN,
      image: CapaEN,
      youtube:
        'https://www.youtube.com/watch?v=L_jWHffIx5E',
    },
    {
      title: 'Go!Create Song',
      name: 'BASF',
      source: PM,
      image: CapaPM,
      youtube:
        'https://www.youtube.com/watch?v=tuInyvxT7tg',
    },
  ];

  useEffect(() => {
    const audio = audioRef.current;
    audio.src = songs[currentSongIndex].source;
    audio.load();

    const handleLoadedMetadata = () => {
      setDuration(audio.duration);
      setProgress(audio.currentTime);
    };

    const handleTimeUpdate = () => {
      setProgress(audio.currentTime);
    };

    const handleEnded = () => {
      let nextIndex = (currentSongIndex + 1) % songs.length;
      setCurrentSongIndex(nextIndex);
      if (swiperRef.current) {
        swiperRef.current.slideTo(nextIndex);
      }
      // Mantemos a reprodução se o usuário já interagiu
      setIsPlaying(true);
    };

    audio.addEventListener('loadedmetadata', handleLoadedMetadata);
    audio.addEventListener('timeupdate', handleTimeUpdate);
    audio.addEventListener('ended', handleEnded);

    if (isPlaying) {
      const playPromise = audio.play();
      if (playPromise !== undefined) {
        playPromise.catch((error) => {
          console.log('Reprodução automática bloqueada:', error);
        });
      }
    } else {
      audio.pause();
    }

    return () => {
      audio.removeEventListener('loadedmetadata', handleLoadedMetadata);
      audio.removeEventListener('timeupdate', handleTimeUpdate);
      audio.removeEventListener('ended', handleEnded);
    };
  }, [currentSongIndex, isPlaying]);

  const handlePlayPause = () => {
    setIsPlaying(!isPlaying);
  };

  const handleProgressChange = (e) => {
    const audio = audioRef.current;
    audio.currentTime = e.target.value;
    setProgress(audio.currentTime);
  };

  const handleNext = () => {
    let nextIndex = (currentSongIndex + 1) % songs.length;
    setCurrentSongIndex(nextIndex);
    if (swiperRef.current) {
      swiperRef.current.slideTo(nextIndex);
    }
  };

  const handlePrev = () => {
    let prevIndex = (currentSongIndex - 1 + songs.length) % songs.length;
    setCurrentSongIndex(prevIndex);
    if (swiperRef.current) {
      swiperRef.current.slideTo(prevIndex);
    }
  };

  const handleSlideChange = (swiper) => {
    const index = swiper.activeIndex;
    setCurrentSongIndex(index);
    // Removemos a reprodução automática ao mudar o slide
    // setIsPlaying(true);
  };

  // Calcular a porcentagem de progresso
  const progressPercent = duration ? (progress / duration) * 100 : 0;

  return (
    <div className="playlist-container">
      <div className="bg"></div>
      <div className="album-cover">
        <Swiper
          effect={'coverflow'}
          centeredSlides={true}
          initialSlide={3}
          slidesPerView={'auto'}
          grabCursor={true}
          spaceBetween={40}
          coverflowEffect={{
            rotate: 25,
            stretch: 0,
            depth: 50,
            modifier: 1,
            slideShadows: false,
          }}
          modules={[EffectCoverflow]}
          onSwiper={(swiper) => (swiperRef.current = swiper)}
          onSlideChange={handleSlideChange}
          className="swiper"
        >
          {songs.map((songItem, index) => (
            <SwiperSlide key={index} className="swiper-slide">
              <img src={songItem.image} alt={songItem.title} />
              <div className="overlay">
                <a
                  href={songItem.youtube}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <IoLogoYoutube />
                </a>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>

      <div className="music-player">
        <h1>{songs[currentSongIndex].title}</h1>
        <p>{songs[currentSongIndex].name}</p>

        <audio id="song" ref={audioRef}>
          <source src={songs[currentSongIndex].source} type="audio/mpeg" />
        </audio>

        <input
          type="range"
          min="0"
          max={duration}
          value={progress}
          onChange={handleProgressChange}
          id="progress"
          className="progress-bar"
          style={{
            '--progress': `${progressPercent}%`,
          }}
        />

        <div className="controls">
          <button className="custom-backward" onClick={handlePrev}>
            <FaBackward />
          </button>
          <button className="play-pause-btn" onClick={handlePlayPause}>
            {isPlaying ? <FaPause /> : <FaPlay />}
          </button>
          <button className="custom-forward" onClick={handleNext}>
            <FaForward />
          </button>
        </div>
      </div>
    </div>
  );
};

export default PlayList;
