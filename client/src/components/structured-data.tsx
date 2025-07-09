export default function StructuredData() {
  const structuredData = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Person",
        "@id": "https://jovialphenom.com/#person",
        "name": "Jovial Phenom",
        "alternateName": "Jovial Phenom",
        "description": "Lo-fi hip-hop and R&B music producer from New York who blends technology with soul to create hypnotic soundscapes.",
        "url": "https://jovialphenom.com",
        "image": "https://jovialphenom.com/assets/jovial-phenom.jpeg",
        "sameAs": [
          "https://open.spotify.com/artist/3rYEhqbvTUMWb6RtZkcKXl",
          "https://music.apple.com/ca/artist/jovial-phenom/1790666838",
          "https://soundcloud.com/jovial-phenom",
          "https://www.youtube.com/channel/UC8CllLIMTah6-YHJm6mJywA"
        ],
        "jobTitle": "Music Producer",
        "worksFor": {
          "@type": "Organization",
          "name": "Independent Artist"
        },
        "address": {
          "@type": "PostalAddress",
          "addressLocality": "New York",
          "addressRegion": "NY",
          "addressCountry": "US"
        },
        "genre": ["Lo-fi Hip-Hop", "R&B", "Hip-Hop"],
        "instrument": ["Digital Audio Workstation", "AI Music Tools"]
      },
      {
        "@type": "WebSite",
        "@id": "https://jovialphenom.com/#website",
        "url": "https://jovialphenom.com",
        "name": "Jovial Phenom - Official Website",
        "description": "Official website of Jovial Phenom, lo-fi hip-hop and R&B music producer from New York.",
        "publisher": {
          "@id": "https://jovialphenom.com/#person"
        },
        "inLanguage": "en-US"
      },
      {
        "@type": "MusicGroup",
        "@id": "https://jovialphenom.com/#musicgroup",
        "name": "Jovial Phenom",
        "description": "Sensual lo-fi hip-hop meets R&B. Where technology and soul collide to create hypnotic soundscapes.",
        "genre": ["Lo-fi Hip-Hop", "R&B", "Hip-Hop"],
        "image": "https://jovialphenom.com/assets/jovial-phenom.jpeg",
        "url": "https://jovialphenom.com",
        "sameAs": [
          "https://open.spotify.com/artist/3rYEhqbvTUMWb6RtZkcKXl",
          "https://music.apple.com/ca/artist/jovial-phenom/1790666838",
          "https://soundcloud.com/jovial-phenom",
          "https://www.youtube.com/channel/UC8CllLIMTah6-YHJm6mJywA"
        ],
        "foundingLocation": {
          "@type": "Place",
          "name": "New York",
          "address": {
            "@type": "PostalAddress",
            "addressLocality": "New York",
            "addressRegion": "NY",
            "addressCountry": "US"
          }
        },
        "member": {
          "@id": "https://jovialphenom.com/#person"
        }
      },
      {
        "@type": "MusicAlbum",
        "@id": "https://jovialphenom.com/#album",
        "name": "Jovial Phenom Collection",
        "description": "Collection of lo-fi hip-hop and R&B tracks by Jovial Phenom featuring Seductive Flow, Thick Vibes, Sweet Sting, and more.",
        "byArtist": {
          "@id": "https://jovialphenom.com/#musicgroup"
        },
        "genre": ["Lo-fi Hip-Hop", "R&B"],
        "datePublished": "2024",
        "tracks": [
          {
            "@type": "MusicRecording",
            "name": "Seductive Flow",
            "description": "A mesmerizing blend of sensual R&B and lo-fi hip-hop that creates an intimate sonic experience.",
            "byArtist": {
              "@id": "https://jovialphenom.com/#musicgroup"
            },
            "duration": "PT3M45S",
            "genre": ["Lo-fi Hip-Hop", "R&B"]
          },
          {
            "@type": "MusicRecording",
            "name": "Thick Vibes",
            "description": "Deep, atmospheric production with lush textures and hypnotic rhythms.",
            "byArtist": {
              "@id": "https://jovialphenom.com/#musicgroup"
            },
            "duration": "PT4M12S",
            "genre": ["Lo-fi Hip-Hop", "R&B"]
          }
        ]
      }
    ]
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
    />
  );
}