# Contact Form Quick Start

Your contact form is ready! Here's what you need to do to make it work:

## 1. Get a Resend Account (Free)

1. Go to https://resend.com and sign up
2. Navigate to **API Keys** in the dashboard
3. Click **Create API Key**
4. Copy the API key (starts with `re_`)

## 2. Add to Vercel

In your Vercel project dashboard:

1. Go to **Settings** → **Environment Variables**
2. Add these two variables:

```
RESEND_API_KEY = re_your_api_key_here
CONTACT_EMAIL = your-email@example.com
```

3. Click **Save**
4. Redeploy your site

## 3. Test It

Visit https://your-site.vercel.app/contact and send a test message!

## That's it!

The contact form is already built and styled. Once you add those two environment variables, it will start working immediately.

For more details, see [CONTACT_SETUP.md](./CONTACT_SETUP.md)
