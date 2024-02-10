

export const load = async ({ locals: { supabase } }) => {
    console.log("Loading session", await supabase.auth.getUser());
    
    return {
        user: await supabase.auth.getUser(),
    }
}
