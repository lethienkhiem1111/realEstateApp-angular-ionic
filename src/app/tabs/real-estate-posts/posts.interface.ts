export interface RealEstateResponse {
    post_id: number,
    user_id: string, 
    catalog: string,
    title: string,
    price: number,
    area: number,
    content: string,
    image_url: string, 
    city: string,
    district: string,
    address: string,
    location: string,
    certification: string,
    direction: string,
    rating: number,
    bedroom: number,
    restroom: number,
    floor: number,
    house_level?: string,
    facade_area?: string
  }
  export interface  PostsResponse {
    post_id: number,
    user_id: string, 
    title: string,
    price: number,
    thumbnail: string, 
    catalog: string,
    city: string,
    district: string,
    create_at: Date
  }