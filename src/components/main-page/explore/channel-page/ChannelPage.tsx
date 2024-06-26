import Carousel from "@/components/util-components/carousel/Carousel";
import LoaderSpin from "@/components/util-components/loader-spin/LoaderSpin";
import { Suspense } from "react";
import { Await, useLoaderData } from "react-router-dom";
import PlaylistCard from "../../playlist-card/PlaylistCard";
import { container } from "@/app/App.css";
import { Artist, Playlist, Radio, Release } from "@/types/deezerApiTypes";
import { genrePageLoaderData } from "@/utils/loaders";

const ChannelPage = () => {
  const { data } = useLoaderData() as genrePageLoaderData;

  return (
    <div>
      <Suspense fallback={<LoaderSpin />}>
        <Await resolve={data}>
          {({
            genreRadios,
            genreArtists,
            editorialReleases,
            chartPlaylists,
            genreName,
          }) => (
            <>
              <h1 className={container}>{genreName}</h1>
              <section className={container}>
                <Carousel
                  heading="Playlists"
                  slides={chartPlaylists.data.map((playlist: Playlist) => (
                    <PlaylistCard imgSrc={playlist.picture_medium} />
                  ))}
                />
              </section>

              <section className={container}>
                <Carousel
                  heading="Artists"
                  slides={genreArtists.data.map((artist: Artist) => (
                    <PlaylistCard imgSrc={artist.picture_medium} />
                  ))}
                />
              </section>
              <section className={container}>
                <Carousel
                  heading="Editorial Releases"
                  slides={editorialReleases.data.map((release: Release) => (
                    <PlaylistCard imgSrc={release.cover_medium} />
                  ))}
                />
              </section>
              <section className={container}>
                <Carousel
                  slides={genreRadios.data.map((radio: Radio) => (
                    <PlaylistCard imgSrc={radio.picture_medium} />
                  ))}
                  heading="Radios"
                />
              </section>
            </>
          )}
        </Await>
      </Suspense>
    </div>
  );
};

export default ChannelPage;
