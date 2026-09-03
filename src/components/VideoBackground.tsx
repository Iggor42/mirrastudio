import { CinematicResinPlayer, CinematicResinPlayerProps } from "./CinematicResinPlayer";

interface VideoProps {
  srcMp4: string;
  srcWebm?: string;
  poster: string;
  className?: string;
}

export function VideoBackground({ srcMp4, srcWebm, poster, className }: VideoProps) {
  return (
    <CinematicResinPlayer
      srcMp4={srcMp4}
      srcWebm={srcWebm}
      poster={poster}
      className={className}
      alt="Vídeo de fundo MIRRA"
    />
  );
}

export type { CinematicResinPlayerProps };
