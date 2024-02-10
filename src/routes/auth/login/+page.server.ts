import { z } from 'zod';
import { fail, redirect } from '@sveltejs/kit';
import { superValidate } from 'sveltekit-superforms/server';
import { dev } from '$app/environment';
import type { LayoutServerLoad } from './$types';
import { supabase } from '$lib/supabaseClient';
import type { SignInWithPasswordCredentials } from '@supabase/supabase-js';

const schema = z.object({
  password: z.string().min(6),
  email: z.string().email(),
  rememberMe: z.boolean(),
});

export const load = (async (locals: {  }) => {

  return {
    data: {}
  };
}) satisfies LayoutServerLoad;

export const actions = {
  default: async ({ request, cookies }) => {
    const form = await superValidate(request, schema);
    console.log('POST', form);

    // Convenient validation check:
    if (!form.valid) {
      // Again, return { form } and things will just work.
      return fail(400, { form });
    }

    // TODO: Do something with the validated form.data
    let creds: SignInWithPasswordCredentials = {
      email: form.data.email,
      password: form.data.password
    }
    const {data, error} = await supabase.auth.signInWithPassword(creds);

    cookies.set('au', JSON.stringify({
      email: form.data.email,
      password: form.data.password,
      rememberMe: form.data.rememberMe,
    }), {
      path: '/',
      httpOnly: true,
      sameSite: 'strict',
      secure: !dev,
      maxAge: 60 * 60 * 24 * 30
    });

    console.log("returning...", form)
    if(!error) throw redirect(300, '/app/locations');
    return { form };
  }
};