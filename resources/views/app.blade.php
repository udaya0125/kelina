<!DOCTYPE html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}">
    <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1">

            <!-- <title>Kelina International | Best CCTV Cameras & Systems Shop</title> -->
                <title inertia>{{ config('app.name', 'Kelina International | Best CCTV Cameras & Systems Shop') }}</title>

        <!-- Fonts -->
        <link rel="icon" href="{{asset('shopping-cart.png')}}"> 

        <link rel="preconnect" href="https://fonts.bunny.net">
        <link href="https://fonts.bunny.net/css?family=figtree:400,500,600&display=swap" rel="stylesheet" />



        <link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Alex+Brush&family=Crimson+Pro:ital,wght@0,200..900;1,200..900&family=Crimson+Text:ital,wght@0,400;0,600;0,700;1,400;1,600;1,700&family=Google+Sans+Code:ital,wght@0,300..800;1,300..800&family=Google+Sans:ital,opsz,wght@0,17..18,400..700;1,17..18,400..700&family=Inter:ital,opsz,wght@0,14..32,100..900;1,14..32,100..900&family=Josefin+Sans:ital,wght@0,100..700;1,100..700&family=Jost:ital,wght@0,100..900;1,100..900&family=Montserrat:ital,wght@0,100..900;1,100..900&family=Open+Sans:ital,wght@0,300..800;1,300..800&family=Playfair+Display:ital,wght@0,400..900;1,400..900&family=Poppins:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,100;1,200;1,300;1,400;1,500;1,600;1,700;1,800;1,900&family=Roboto:ital,wght@0,100..900;1,100..900&family=Titan+One&family=Urbanist:ital,wght@0,100..900;1,100..900&display=swap" rel="stylesheet">


<script type="application/ld+json">
{
    "@context": "https://schema.org",
    "@type": "Organization",
    "name": "Kelina",
    "alternateName": "Kelina Nepal",
    "url": "https://kelina.com.np",
    "logo": {
        "@type": "ImageObject",
        "url": "https://kelina.com.np/images/logo.png"
    },
    "description": "Kelina is a Nepal-based online store offering a wide range of products.",
    "foundingDate": "2022",
    "address": {
        "@type": "PostalAddress",
        "addressCountry": "NP",
        "addressLocality": "Pokhara"
    },
    "contactPoint": {
        "@type": "ContactPoint",
        "contactType": "customer service",
        "availableLanguage": ["English", "Nepali"]
    },
    "sameAs": [
        "https://www.facebook.com/kelina",
        "https://www.instagram.com/kelina",
        "https://www.tiktok.com/@kelina"
    ]
}
</script>


        <script type="application/ld+json">
    {
        "@context": "https://schema.org",
        "@type": "Organization",
        "name": "Kelina",
        "url": "https://kelina.com.np",
        "logo": "https://kelina.com.np/images/logo.png",
        "sameAs": [
            "https://www.facebook.com/kelina",
            "https://www.instagram.com/kelina"
        ],
        "contactPoint": {
            "@type": "ContactPoint",
            "contactType": "customer service",
            "availableLanguage": "English"
        }
    }
    </script>

    <!-- WebSite + Sitelinks Searchbox Schema -->
    <script type="application/ld+json">
    {
        "@context": "https://schema.org",
        "@type": "WebSite",
        "name": "Kelina",
        "url": "https://kelina.com.np",
        "potentialAction": {
            "@type": "SearchAction",
            "target": {
                "@type": "EntryPoint",
                "urlTemplate": "https://kelina.com.np/shop?search={search_term_string}"
            },
            "query-input": "required name=search_term_string"
        }
    }
    </script>


        <!-- Scripts -->
        @routes
        @viteReactRefresh
        @vite(['resources/js/app.jsx', "resources/js/Pages/{$page['component']}.jsx"])
        @inertiaHead
    </head>
    <body class="font-sans antialiased">
        @inertia
    </body>
</html>
