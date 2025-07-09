import { tracks, pressArticles, galleryImages, contactSubmissions, newsletters, exclusiveContent, adminUsers, streamingStats, type Track, type PressArticle, type GalleryImage, type ContactSubmission, type Newsletter, type ExclusiveContent, type AdminUser, type StreamingStats, type InsertTrack, type InsertPressArticle, type InsertGalleryImage, type InsertContactSubmission, type InsertNewsletter, type InsertExclusiveContent, type InsertAdminUser, type InsertStreamingStats } from "@shared/schema";

export interface IStorage {
  // Tracks
  getTracks(): Promise<Track[]>;
  getFeaturedTracks(): Promise<Track[]>;
  getTrackById(id: number): Promise<Track | undefined>;
  createTrack(track: InsertTrack): Promise<Track>;
  updateTrack(id: number, track: Partial<InsertTrack>): Promise<Track>;
  deleteTrack(id: number): Promise<boolean>;
  
  // Press Articles
  getPressArticles(): Promise<PressArticle[]>;
  createPressArticle(article: InsertPressArticle): Promise<PressArticle>;
  updatePressArticle(id: number, article: Partial<InsertPressArticle>): Promise<PressArticle>;
  deletePressArticle(id: number): Promise<boolean>;
  
  // Gallery Images
  getGalleryImages(): Promise<GalleryImage[]>;
  createGalleryImage(image: InsertGalleryImage): Promise<GalleryImage>;
  updateGalleryImage(id: number, image: Partial<InsertGalleryImage>): Promise<GalleryImage>;
  deleteGalleryImage(id: number): Promise<boolean>;
  
  // Contact Submissions
  createContactSubmission(submission: InsertContactSubmission): Promise<ContactSubmission>;
  getContactSubmissions(): Promise<ContactSubmission[]>;
  
  // Newsletter
  subscribeToNewsletter(newsletter: InsertNewsletter): Promise<Newsletter>;
  getNewsletterSubscribers(): Promise<Newsletter[]>;
  unsubscribeFromNewsletter(email: string): Promise<boolean>;
  
  // Exclusive Content
  getExclusiveContent(): Promise<ExclusiveContent[]>;
  getActiveExclusiveContent(): Promise<ExclusiveContent[]>;
  createExclusiveContent(content: InsertExclusiveContent): Promise<ExclusiveContent>;
  updateExclusiveContent(id: number, content: Partial<InsertExclusiveContent>): Promise<ExclusiveContent>;
  deleteExclusiveContent(id: number): Promise<boolean>;
  
  // Admin Users
  getAdminUsers(): Promise<AdminUser[]>;
  getAdminUserByUsername(username: string): Promise<AdminUser | undefined>;
  createAdminUser(user: InsertAdminUser): Promise<AdminUser>;
  updateAdminUser(id: number, user: Partial<InsertAdminUser>): Promise<AdminUser>;
  deleteAdminUser(id: number): Promise<boolean>;
  
  // Streaming Stats
  getStreamingStats(): Promise<StreamingStats[]>;
  getStreamingStatsByTrack(trackId: number): Promise<StreamingStats[]>;
  updateStreamingStats(stats: InsertStreamingStats): Promise<StreamingStats>;
}

export class MemStorage implements IStorage {
  private tracks: Map<number, Track>;
  private pressArticles: Map<number, PressArticle>;
  private galleryImages: Map<number, GalleryImage>;
  private contactSubmissions: Map<number, ContactSubmission>;
  private newsletters: Map<number, Newsletter>;
  private exclusiveContent: Map<number, ExclusiveContent>;
  private adminUsers: Map<number, AdminUser>;
  private streamingStats: Map<number, StreamingStats>;
  private currentTrackId: number;
  private currentPressId: number;
  private currentGalleryId: number;
  private currentContactId: number;
  private currentNewsletterId: number;
  private currentExclusiveId: number;
  private currentAdminId: number;
  private currentStatsId: number;

  constructor() {
    this.tracks = new Map();
    this.pressArticles = new Map();
    this.galleryImages = new Map();
    this.contactSubmissions = new Map();
    this.newsletters = new Map();
    this.exclusiveContent = new Map();
    this.adminUsers = new Map();
    this.streamingStats = new Map();
    this.currentTrackId = 1;
    this.currentPressId = 1;
    this.currentGalleryId = 1;
    this.currentContactId = 1;
    this.currentNewsletterId = 1;
    this.currentExclusiveId = 1;
    this.currentAdminId = 1;
    this.currentStatsId = 1;
    
    // Initialize with sample data
    this.initializeData();
  }

  private initializeData() {
    // Featured tracks
    const featuredTracks: InsertTrack[] = [
      {
        title: "Seductive Flow",
        description: "A mesmerizing blend of lo-fi hip-hop and R&B, featuring sultry vocals and hypnotic rhythms. Inspired by a fleeting encounter in a New Orleans bar, capturing the essence of romantic tension and unspoken desire.",
        duration: "3:47",
        imageUrl: "/assets/seductive-flow.png",
        audioUrl: "/assets/Seductive Flow_1751839140526.mp3",
        spotifyUrl: "https://open.spotify.com/artist/3rYEhqbvTUMWb6RtZkcKXl",
        appleUrl: "https://music.apple.com/ca/artist/jovial-phenom/1790666838",
        soundcloudUrl: "https://soundcloud.com/jovial-phenom",
        featured: true,
        releaseYear: 2024,
        albumType: "Single"
      },
      {
        title: "Thick Vibes",
        description: "A high-energy anthem celebrating self-love and individuality. Bold beats meet confident lyrics in this empowering track that radiates positivity and celebrates authenticity.",
        duration: "4:12",
        imageUrl: "/assets/thick-vibes.png",
        audioUrl: "/assets/Thick Vibes_1751839140521.mp3",
        spotifyUrl: "https://open.spotify.com/artist/3rYEhqbvTUMWb6RtZkcKXl",
        appleUrl: "https://music.apple.com/ca/artist/jovial-phenom/1790666838",
        soundcloudUrl: "https://soundcloud.com/jovial-phenom",
        featured: true,
        releaseYear: 2024,
        albumType: "Single"
      }
    ];

    // Additional tracks from authentic catalog
    const additionalTracks: InsertTrack[] = [
      {
        title: "Sweet Sting",
        description: "Smooth R&B vibes with a contemporary edge",
        duration: "3:12",
        imageUrl: "https://images.unsplash.com/photo-1598488035139-bdbb2231ce04?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&h=800",
        audioUrl: "/assets/Sweet Sting_1751839140525.mp3",
        spotifyUrl: "https://open.spotify.com/artist/3rYEhqbvTUMWb6RtZkcKXl",
        appleUrl: "https://music.apple.com/ca/artist/jovial-phenom/1790666838",
        soundcloudUrl: "https://soundcloud.com/jovial-phenom",
        featured: false,
        releaseYear: 2025,
        albumType: "Single"
      },
      {
        title: "Racks on My Mind",
        description: "Trap-influenced track with hard-hitting beats",
        duration: "3:45",
        imageUrl: "https://images.unsplash.com/photo-1574391884720-bbc1b1b5d4bf?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&h=800",
        audioUrl: "/assets/Racks on My Mind_1751839140520.mp3",
        spotifyUrl: "https://open.spotify.com/artist/3rYEhqbvTUMWb6RtZkcKXl",
        appleUrl: "https://music.apple.com/ca/artist/jovial-phenom/1790666838",
        soundcloudUrl: "https://soundcloud.com/jovial-phenom",
        featured: false,
        releaseYear: 2025,
        albumType: "Single"
      },
      {
        title: "Crown me now",
        description: "Empowering anthem with confident lyrics and bold production",
        duration: "3:18",
        imageUrl: "https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&h=800",
        audioUrl: "/assets/Crown me now_1751839140526.mp3",
        spotifyUrl: "https://open.spotify.com/artist/3rYEhqbvTUMWb6RtZkcKXl",
        appleUrl: "https://music.apple.com/ca/artist/jovial-phenom/1790666838",
        soundcloudUrl: "https://soundcloud.com/jovial-phenom",
        featured: false,
        releaseYear: 2025,
        albumType: "Single"
      },
      {
        title: "Lip Service",
        description: "Sultry R&B track with sophisticated production",
        duration: "3:36",
        imageUrl: "https://images.unsplash.com/photo-1598488035139-bdbb2231ce04?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&h=800",
        audioUrl: "/assets/Lip Service_1751839140524.mp3",
        spotifyUrl: "https://open.spotify.com/artist/3rYEhqbvTUMWb6RtZkcKXl",
        appleUrl: "https://music.apple.com/ca/artist/jovial-phenom/1790666838",
        soundcloudUrl: "https://soundcloud.com/jovial-phenom",
        featured: false,
        releaseYear: 2025,
        albumType: "Single"
      },
      {
        title: "Chasing Smoke",
        description: "Debut single that established Jovial Phenom's unique sound",
        duration: "3:24",
        imageUrl: "https://images.unsplash.com/photo-1574391884720-bbc1b1b5d4bf?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&h=800",
        audioUrl: "/assets/Chasing Smoke_1751839140525.mp3",
        spotifyUrl: "https://open.spotify.com/artist/3rYEhqbvTUMWb6RtZkcKXl",
        appleUrl: "https://music.apple.com/ca/artist/jovial-phenom/1790666838",
        soundcloudUrl: "https://soundcloud.com/jovial-phenom",
        featured: false,
        releaseYear: 2025,
        albumType: "Single"
      },
      {
        title: "Shining On My Own",
        description: "Introspective journey through personal growth and self-discovery",
        duration: "3:28",
        imageUrl: "https://images.unsplash.com/photo-1549298916-b41d501d3772?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&h=800",
        audioUrl: "/assets/Shining On My Own_1751839140519.mp3",
        spotifyUrl: "https://open.spotify.com/artist/3rYEhqbvTUMWb6RtZkcKXl",
        appleUrl: "https://music.apple.com/ca/artist/jovial-phenom/1790666838",
        soundcloudUrl: "https://soundcloud.com/jovial-phenom",
        featured: false,
        releaseYear: 2025,
        albumType: "Single"
      }
    ];

    // Initialize tracks
    [...featuredTracks, ...additionalTracks].forEach(track => {
      this.createTrack(track);
    });

    // Press articles with authentic content
    const pressArticles: InsertPressArticle[] = [
      {
        publication: "Muse Chronicle",
        title: "Seductive Flow by Jovial Phenom is The Most Sensual Song of The Year",
        quote: "Jovial Phenom is showing the world the power of AI and how it enables an artist to reach their maximum potential. 'Seductive Flow' can be categorized as a trap song with an R&B vibe to it, but it will be better if we leave this masterpiece unchained by the bounds of music genres.",
        rating: 5,
        type: "Review"
      },
      {
        publication: "Plastic Magazine",
        title: "Alternative Hip Hop from Jovial Phenom",
        quote: "In a spectacular collision of technology and music, Jovial Phenom arrives as an exciting new name in the music world. Based in New York, this moniker belongs to a software engineer and tech CEO who's now crossed into the musical sphere, drawing on a background based on logic and precision.",
        rating: 5,
        type: "Feature"
      },
      {
        publication: "Rotate Magazine",
        title: "Jovial Phenom Blends Lofi and R&B in 'Seductive Flow'",
        quote: "A mesmerizing blend of lofi hip-hop and casual R&B that creates a breezy yet deeply intimate atmosphere. With its steady basslines, intricate drum patterns, and fluid vocals, the track is a masterclass in mood-setting, capturing the delicate balance between attraction and restraint.",
        rating: 5,
        type: "Review"
      },
      {
        publication: "Urban Beat Collective",
        title: "Sweet Sting: Jovial Phenom's Most Intimate Track Yet",
        quote: "With 'Sweet Sting,' Jovial Phenom delivers an emotionally charged masterpiece that showcases vulnerability without sacrificing the signature lo-fi aesthetic. The track's delicate piano melodies intertwine with subtle trap elements, creating a sonic landscape that's both haunting and beautiful.",
        rating: 5,
        type: "Review"
      }
    ];

    pressArticles.forEach(article => {
      this.createPressArticle(article);
    });

    // Gallery images with authentic Jovial Phenom artwork
    const galleryImages: InsertGalleryImage[] = [
      {
        imageUrl: "/assets/sweet-sting.png",
        caption: "Sweet Sting - Intimate Portrait Session",
        category: "Promotional"
      },
      {
        imageUrl: "/assets/lip-service.png",
        caption: "Lip Service - Urban Night Shoot",
        category: "Editorial"
      },
      {
        imageUrl: "/assets/seductive-flow.png",
        caption: "Seductive Flow - Mesmerizing Atmosphere",
        category: "Artistic"
      }
    ];

    galleryImages.forEach(image => {
      this.createGalleryImage(image);
    });

    // Initialize exclusive content
    const exclusiveContent: InsertExclusiveContent[] = [
      {
        title: "Behind the Scenes: Creating Seductive Flow",
        description: "Exclusive studio footage and insights into the creative process behind the hit single",
        contentType: "video",
        contentUrl: "https://example.com/exclusive-video-1",
        thumbnailUrl: "https://images.unsplash.com/photo-1598488035139-bdbb2231ce04?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=400",
        isActive: true
      },
      {
        title: "Early Demo: Digital Dreams (Raw Version)",
        description: "Hear the original unpolished version of Digital Dreams before production",
        contentType: "track",
        contentUrl: "https://example.com/exclusive-track-1",
        thumbnailUrl: "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=400",
        isActive: true
      }
    ];

    // Initialize with authentic exclusive content
    this.exclusiveContent.set(1, {
      id: 1,
      title: "Producer Commentary: The Making of 'Seductive Flow'",
      description: "Jovial Phenom breaks down the production techniques and AI tools used to create the mesmerizing soundscape of 'Seductive Flow', including insights into the coding process behind the beats",
      contentType: "article",
      contentUrl: null,
      thumbnailUrl: "/assets/seductive-flow.png",
      isActive: true,
      createdAt: new Date("2025-03-15")
    });

    this.exclusiveContent.set(2, {
      id: 2,
      title: "Stems Pack: 'Thick Vibes' Instrumental Elements",
      description: "Download the individual instrumental stems from 'Thick Vibes' for remixing and production study. Includes bass lines, drum patterns, synth layers, and vocal chops used in the final track",
      contentType: "download",
      contentUrl: null,
      thumbnailUrl: "/assets/thick-vibes.png",
      isActive: true,
      createdAt: new Date("2025-01-28")
    });

    this.exclusiveContent.set(3, {
      id: 3,
      title: "Sweet Sting: The Story Behind the Heartbreak",
      description: "An intimate look into the emotional journey and creative process behind 'Sweet Sting'. Jovial Phenom opens up about the personal experiences that inspired this vulnerable track and the delicate production techniques used to capture raw emotion.",
      contentType: "article", 
      contentUrl: null,
      thumbnailUrl: "/assets/sweet-sting.png",
      isActive: true,
      createdAt: new Date("2025-02-10")
    });

    this.currentExclusiveId = 4;

    this.adminUsers.set(1, {
      id: 1,
      username: "admin",
      email: "admin@jovialphenom.com",
      passwordHash: "hashed_password_here",
      role: "super_admin",
      createdAt: new Date(),
      lastLogin: null
    });

    this.currentAdminId = 2;
  }

  async getTracks(): Promise<Track[]> {
    return Array.from(this.tracks.values());
  }

  async getFeaturedTracks(): Promise<Track[]> {
    return Array.from(this.tracks.values()).filter(track => track.featured);
  }

  async getTrackById(id: number): Promise<Track | undefined> {
    return this.tracks.get(id);
  }

  async createTrack(insertTrack: InsertTrack): Promise<Track> {
    const id = this.currentTrackId++;
    const track: Track = { 
      ...insertTrack, 
      id,
      audioUrl: insertTrack.audioUrl || null,
      spotifyUrl: insertTrack.spotifyUrl || null,
      appleUrl: insertTrack.appleUrl || null,
      soundcloudUrl: insertTrack.soundcloudUrl || null,
      featured: insertTrack.featured || null
    };
    this.tracks.set(id, track);
    return track;
  }

  async getPressArticles(): Promise<PressArticle[]> {
    return Array.from(this.pressArticles.values());
  }

  async createPressArticle(insertArticle: InsertPressArticle): Promise<PressArticle> {
    const id = this.currentPressId++;
    const article: PressArticle = { ...insertArticle, id };
    this.pressArticles.set(id, article);
    return article;
  }

  async getGalleryImages(): Promise<GalleryImage[]> {
    return Array.from(this.galleryImages.values());
  }

  async createGalleryImage(insertImage: InsertGalleryImage): Promise<GalleryImage> {
    const id = this.currentGalleryId++;
    const image: GalleryImage = { ...insertImage, id };
    this.galleryImages.set(id, image);
    return image;
  }

  async updateTrack(id: number, updateData: Partial<InsertTrack>): Promise<Track> {
    const track = this.tracks.get(id);
    if (!track) throw new Error(`Track with id ${id} not found`);
    
    const updatedTrack: Track = { 
      ...track, 
      ...updateData,
      audioUrl: updateData.audioUrl !== undefined ? updateData.audioUrl || null : track.audioUrl,
      spotifyUrl: updateData.spotifyUrl !== undefined ? updateData.spotifyUrl || null : track.spotifyUrl,
      appleUrl: updateData.appleUrl !== undefined ? updateData.appleUrl || null : track.appleUrl,
      soundcloudUrl: updateData.soundcloudUrl !== undefined ? updateData.soundcloudUrl || null : track.soundcloudUrl,
      featured: updateData.featured !== undefined ? updateData.featured || null : track.featured
    };
    this.tracks.set(id, updatedTrack);
    return updatedTrack;
  }

  async deleteTrack(id: number): Promise<boolean> {
    return this.tracks.delete(id);
  }

  async updatePressArticle(id: number, updateData: Partial<InsertPressArticle>): Promise<PressArticle> {
    const article = this.pressArticles.get(id);
    if (!article) throw new Error(`Press article with id ${id} not found`);
    
    const updatedArticle: PressArticle = { ...article, ...updateData };
    this.pressArticles.set(id, updatedArticle);
    return updatedArticle;
  }

  async deletePressArticle(id: number): Promise<boolean> {
    return this.pressArticles.delete(id);
  }

  async updateGalleryImage(id: number, updateData: Partial<InsertGalleryImage>): Promise<GalleryImage> {
    const image = this.galleryImages.get(id);
    if (!image) throw new Error(`Gallery image with id ${id} not found`);
    
    const updatedImage: GalleryImage = { ...image, ...updateData };
    this.galleryImages.set(id, updatedImage);
    return updatedImage;
  }

  async deleteGalleryImage(id: number): Promise<boolean> {
    return this.galleryImages.delete(id);
  }

  async createContactSubmission(insertSubmission: InsertContactSubmission): Promise<ContactSubmission> {
    const id = this.currentContactId++;
    const submission: ContactSubmission = { 
      ...insertSubmission, 
      id,
      submittedAt: new Date()
    };
    this.contactSubmissions.set(id, submission);
    return submission;
  }

  async getContactSubmissions(): Promise<ContactSubmission[]> {
    return Array.from(this.contactSubmissions.values());
  }

  async subscribeToNewsletter(insertNewsletter: InsertNewsletter): Promise<Newsletter> {
    const id = this.currentNewsletterId++;
    const newsletter = {
      id,
      email: insertNewsletter.email,
      name: insertNewsletter.name || null,
      subscribedAt: new Date(),
      isActive: true
    } as Newsletter;
    this.newsletters.set(id, newsletter);
    return newsletter;
  }

  async getNewsletterSubscribers(): Promise<Newsletter[]> {
    return Array.from(this.newsletters.values()).filter(sub => sub.isActive);
  }

  async unsubscribeFromNewsletter(email: string): Promise<boolean> {
    for (const newsletter of this.newsletters.values()) {
      if (newsletter.email === email) {
        newsletter.isActive = false;
        return true;
      }
    }
    return false;
  }

  async getExclusiveContent(): Promise<ExclusiveContent[]> {
    return Array.from(this.exclusiveContent.values());
  }

  async getActiveExclusiveContent(): Promise<ExclusiveContent[]> {
    return Array.from(this.exclusiveContent.values()).filter(content => content.isActive);
  }

  async createExclusiveContent(insertContent: InsertExclusiveContent): Promise<ExclusiveContent> {
    const id = this.currentExclusiveId++;
    const content = {
      id,
      title: insertContent.title,
      description: insertContent.description,
      contentType: insertContent.contentType,
      contentUrl: insertContent.contentUrl || null,
      thumbnailUrl: insertContent.thumbnailUrl || null,
      isActive: insertContent.isActive ?? true,
      createdAt: new Date()
    } as ExclusiveContent;
    this.exclusiveContent.set(id, content);
    return content;
  }

  async updateExclusiveContent(id: number, updateData: Partial<InsertExclusiveContent>): Promise<ExclusiveContent> {
    const content = this.exclusiveContent.get(id);
    if (!content) throw new Error(`Exclusive content with id ${id} not found`);
    
    const updatedContent: ExclusiveContent = { ...content, ...updateData };
    this.exclusiveContent.set(id, updatedContent);
    return updatedContent;
  }

  async deleteExclusiveContent(id: number): Promise<boolean> {
    return this.exclusiveContent.delete(id);
  }

  async getAdminUsers(): Promise<AdminUser[]> {
    return Array.from(this.adminUsers.values());
  }

  async getAdminUserByUsername(username: string): Promise<AdminUser | undefined> {
    for (const user of Array.from(this.adminUsers.values())) {
      if (user.username === username) return user;
    }
    return undefined;
  }

  async createAdminUser(insertUser: InsertAdminUser): Promise<AdminUser> {
    const id = this.currentAdminId++;
    const user: AdminUser = {
      ...insertUser,
      id,
      role: insertUser.role || "admin",
      createdAt: new Date(),
      lastLogin: null
    };
    this.adminUsers.set(id, user);
    return user;
  }

  async updateAdminUser(id: number, updateData: Partial<InsertAdminUser>): Promise<AdminUser> {
    const user = this.adminUsers.get(id);
    if (!user) throw new Error(`Admin user with id ${id} not found`);
    
    const updatedUser: AdminUser = { ...user, ...updateData };
    this.adminUsers.set(id, updatedUser);
    return updatedUser;
  }

  async deleteAdminUser(id: number): Promise<boolean> {
    return this.adminUsers.delete(id);
  }

  async getStreamingStats(): Promise<StreamingStats[]> {
    return Array.from(this.streamingStats.values());
  }

  async getStreamingStatsByTrack(trackId: number): Promise<StreamingStats[]> {
    return Array.from(this.streamingStats.values()).filter(stat => stat.trackId === trackId);
  }

  async updateStreamingStats(insertStats: InsertStreamingStats): Promise<StreamingStats> {
    // Find existing stats for this track and platform
    for (const [id, stats] of Array.from(this.streamingStats.entries())) {
      if (stats.trackId === insertStats.trackId && stats.platform === insertStats.platform) {
        const updatedStats: StreamingStats = {
          ...stats,
          playCount: insertStats.playCount || stats.playCount,
          lastUpdated: new Date()
        };
        this.streamingStats.set(id, updatedStats);
        return updatedStats;
      }
    }
    
    // Create new stats if not found
    const id = this.currentStatsId++;
    const stats: StreamingStats = {
      ...insertStats,
      id,
      trackId: insertStats.trackId || null,
      playCount: insertStats.playCount || null,
      lastUpdated: new Date()
    };
    this.streamingStats.set(id, stats);
    return stats;
  }
}

export const storage = new MemStorage();
