-- Supabase Reviews Table
create table if not exists reviews (
    id uuid primary key default gen_random_uuid(),
    user_id uuid references auth.users(id),
    listing_id uuid references listings(id),
    rating integer check (rating >= 1 and rating <= 5),
    review text,
    created_at timestamp default now()
);