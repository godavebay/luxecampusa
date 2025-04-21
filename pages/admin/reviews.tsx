import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { supabase } from "../../frontend/utils/supabase";
import ReviewAdminPanel from "../../admin/ReviewAdminPanel";

export default function ReviewsAdminPage() {
  const [allReviews, setAllReviews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isAdmin, setIsAdmin] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const checkAuth = async () => {
      const {
        data: { session },
      } = await supabase.auth.getSession();

      if (!session) {
        router.push("/login");
        return;
      }

      const { user } = session;
      // Replace this logic with your real admin check
      const { data: profile } = await supabase
        .from("profiles")
        .select("role")
        .eq("id", user.id)
        .single();

      if (profile?.role === "admin") {
        setIsAdmin(true);
        fetchReviews();
      } else {
        router.push("/");
      }
    };

    checkAuth();
  }, []);

  const fetchReviews = async () => {
    const { data } = await supabase.from("reviews").select("*");
    setAllReviews(data || []);
    setLoading(false);
  };

  const handleDelete = async (id) => {
    await supabase.from("reviews").delete().eq("id", id);
    fetchReviews();
  };

  if (loading) return <p>Loading...</p>;
  if (!isAdmin) return null;

  return <ReviewAdminPanel allReviews={allReviews} onDelete={handleDelete} />;
}