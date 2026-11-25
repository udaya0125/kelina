<?php

use App\Http\Controllers\ProfileController;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;
use Illuminate\Http\Request;
use Illuminate\Support\Str;
use Illuminate\Support\Facades\DB;

use App\Http\Controllers\Auth\AdminController;
use App\Http\Controllers\CategoryController;
use App\Http\Controllers\ProductTypeController;
use App\Http\Controllers\BrandController;
use App\Http\Controllers\ProductController;
use App\Http\Controllers\PromoCodeController;
use App\Http\Controllers\OrderController;
use App\Http\Controllers\AdminAdditionController;
use App\Http\Controllers\LogController;
use App\Http\Controllers\AdminDashboardController;
use App\Http\Controllers\WishlistController;
use App\Http\Controllers\FeaturedProductController;
use App\Http\Controllers\BannerImageController;
use App\Http\Controllers\BestDealProductController;
use App\Http\Controllers\OnsaleProductController;
use App\Http\Controllers\NewArrivalProductController;
use App\Http\Controllers\AboutUsController;
use App\Http\Controllers\EmployeeDataController; 
use App\Http\Controllers\GalleryImageController;
use App\Models\Employee;
use App\Models\GalleryImage;
use App\Models\ComplainRecord;
use App\Http\Controllers\ComplainRecordController;


// Route::get('/', function () {
//     return Inertia::render('Welcome', [
//         'canLogin' => Route::has('login'),
//         'canRegister' => Route::has('register'),
//         'laravelVersion' => Application::VERSION,
//         'phpVersion' => PHP_VERSION,
//     ]);
// });

///////////////

Route::middleware(['auth', 'admin'])->group(function() {

    Route::get('/saitadmin', function() {
        return Inertia::render('Admin/AdminDashboard', ['componentName' => 'AdminDashboard']);
    })->name('saitadmin.dashboard');

    Route::get('/saitadmin/productbrand', function() {
        return Inertia::render('Admin/AdminProductBrands',['componentName' => 'AdminProductBrands']);
    });
    
    Route::get('/saitadmin/productcategory', function() {
        return Inertia::render('Admin/AdminProductCategory', ['componentName' => 'AdminProductCategory']);
    });
    
    Route::get('/saitadmin/producttype', function() {
        return Inertia::render('Admin/AdminProductTypes', ['componentName' => 'AdminProductTypes']);
    });
    
    Route::get('/saitadmin/products', function() {
        return Inertia::render('Admin/AdminProducts', ['componentName' => 'AdminProducts']);
    });
    
    Route::get('/saitadmin/editproduct', function() {
        return Inertia::render('Admin/AdminEditProductPage', ['componentName' => 'AdminEditProductPage']);
    });


    Route::get('/saitadmin/user', function() {
        return Inertia::render('Admin/AdminUser', ['componentName' => 'AdminUser']); 
    });


    Route::get('/saitadmin/promocode', function() {
        return Inertia::render('Admin/AdminPromoCode', ['componentName' => 'AdminPromoCode']);
    });

     Route::get('/saitadmin/orders', function() {
        return Inertia::render('Admin/AdminOrders', ['componentName' => 'AdminOrders']);
    });

    Route::get('/saitadmin/complain-record', function() {
        return Inertia::render('Admin/AdminComplainRecord', ['componentName' => 'AdminComplainRecord']);
    });


    Route::get('/saitadmin/logs', function() {
        return Inertia::render('Admin/AdminLogs', ['componentName' => 'AdminLogs']); 
    });


    Route::get('/saitadmin/featuredproduct', function() {
        return Inertia::render('Admin/AdminFeaturedProduct', ['componentName' => 'AdminFeaturedProduct']);
    });

    Route::get('/saitadmin/banner', function() {
        return Inertia::render('Admin/AdminBannerSection', ['componentName' => 'AdminBanner']);
    });

    Route::get('saitadmin/onsale', function() {
        return Inertia::render('Admin/AdminOnSaleProduct', ['componentName' => 'AdminOnSaleProduct']);
    }); 

    Route::get('saitadmin/newarrival', function() {
        return Inertia::render('Admin/AdminNewArrivalProduct', ['componentName' => 'AdminNewArrivalProduct']);
    });

    Route::get('saitadmin/bestdeals', function() {
        return Inertia::render('Admin/AdminBestDeals', ['componentName' => 'AdminBestDealsProduct']);
    });


    Route::get('saitadmin/aboutus', function() {
        return Inertia::render('Admin/AboutUs', ['componentName' => 'AdminAboutUs']);
    });


    Route::get('saitadmin/employee', function() {
        return Inertia::render('Admin/AdminEmployee', ['componentName' => 'AdminEmployee']); 
    });


    Route::get('saitadmin/gallery', function() {
        return Inertia::render('Admin/AdminGallerySection', ['componentName' => 'AdminGallerySection']);
    });




    Route::post('/addcategories', [CategoryController::class, 'store'])->name('categories.store'); 
    Route::post('/deletecategories', [CategoryController::class, 'destroy'])->name('categories.destroy');
    // Route::put('/categories/{category}', [CategoryController::class, 'update'])->name('categories.update');
    Route::post('/categories/{category}', [CategoryController::class, 'update'])->name('categories.update');



    Route::post('/addproducttype', [ProductTypeController::class, 'store'])->name('producttype.store'); 
    Route::post('/deleteproducttype', [ProductTypeController::class, 'destroy'])->name('producttype.destroy');
    Route::put('/producttype/{productType}', [ProductTypeController::class, 'update'])->name('producttype.update'); 


    Route::post('/updateproductbrand', [BrandController::class, 'update'])->name('productbrand.update'); 
    Route::post('/deleteproductbrand', [BrandController::class, 'destroy'])->name('productbrand.destroy'); 
    Route::post('/addproductbrand', [BrandController::class, 'store'])->name('productbrand.store'); 


    Route::post('/addimages', [ProductController::class, 'addImages'])->name('productImage.add');
    Route::post('/updatecontent', [ProductController::class, 'update'])->name('productcontent.update');
    Route::post('/delete',[ProductController::class, 'destroy'])->name('product.destroy'); 

    Route::post('/addproduct', [ProductController::class, 'store'])->name('product.store');

    Route::get('/showproductforedit/{id}', [ProductController::class, 'showForEdit'])->name('productedit.show');
   
    Route::delete('/deleteimage/{id}', [ProductController::class, 'deleteImage'])->name('productimage.destroy');

    Route::get('/adminproducts', [ProductController::class, 'adminindex'])->name('adminproduct.index');
    



    Route::post('/addadmin', [AdminAdditionController::class, 'store'])->name('admin.store'); 
Route::get('/getadmins', [AdminAdditionController::class, 'index'])->name('admin.index'); 
Route::post('/destroyadmin', [AdminAdditionController::class, 'destroy'])->name('admin.destroy'); 



  // #########################################################
  // #########################################################

    Route::get('/ourcomplain', [ComplainRecordController::class, 'index'])->name('ourcomplain.index');
    Route::post('/ourcomplain', [ComplainRecordController::class, 'store'])->name('ourcomplain.store');
    Route::put('/ourcomplain/{id}', [ComplainRecordController::class, 'update'])->name('ourcomplain.update');
    Route::delete('/ourcomplain/{id}', [ComplainRecordController::class, 'destroy'])->name('ourcomplain.destroy');
    Route::patch('/ourcomplain/{id}/status', [ComplainRecordController::class, 'updateStatus'])->name('ourcomplain.status');

Route::get('/getlogs', [LogController::class, 'index'])->name('log.index'); 

Route::get('/getdashboardstats', [AdminDashboardController::class, 'getStatistics'])->name('dashboard.stats'); 

Route::get('/getdashboardmonthlysales', [AdminDashboardController::class, 'getMonthlySalesData'])->name('dashboard.sales');



Route::post('/addpromocode', [PromoCodeController::class, 'store'])->name('promocode.store'); 
Route::get('/getpromocode', [PromoCodeController::class, 'index'])->name('promocode.index'); 
Route::post('/updatepromocode', [PromoCodeController::class, 'update'])->name('promocode.update'); 
Route::post('/destroypromocode', [PromoCodeController::class, 'destroy'])->name('promocode.destroy'); 


Route::get('/getorders', [OrderController::class, 'index'])->name('order.index'); 
Route::post('/destroyorder', [OrderController::class, 'destroy'])->name('order.destroy'); 

Route::post('/updateorders', [OrderController::class, 'updateStatus'])->name('order.update');



Route::post('/addfeaturedproduct', [FeaturedProductController::class, 'store'])->name('featuredproduct.store');
Route::delete('/featuredproduct/{featuredProduct}', [FeaturedProductController::class, 'destroy'])->name('featuredproduct.destroy');

Route::post('/addbestdealproduct', [BestDealProductController::class, 'store'])->name('bestdealproduct.store');
Route::delete('/bestdealproduct/{bestdealProduct}', [BestDealProductController::class, 'destroy'])->name('bestdealproduct.destroy');

Route::post('/addonsaleproduct', [OnsaleProductController::class, 'store'])->name('onsaleproduct.store');
Route::delete('/onsaleproduct/{onsaleproduct}', [OnsaleProductController::class, 'destroy'])->name('onsaleproduct.destroy');

Route::post('/addnewarrivalproduct', [NewArrivalProductController::class, 'store'])->name('newarrivalproduct.store');
Route::delete('/newarrivalproduct/{newarrivalproduct}', [NewArrivalProductController::class, 'destroy'])->name('newarrivalproduct.destroy');


Route::post('/addfeaturedproduct', [FeaturedProductController::class, 'store'])->name('featuredproduct.store');
Route::delete('/featuredproduct/{featuredProduct}', [FeaturedProductController::class, 'destroy'])->name('featuredproduct.destroy');


Route::post('/addbannerimage', [BannerImageController::class, 'store'])->name('bannerimage.store'); 
// Route::get('/getBannerImage', [BannerImageController::class, 'index'])->name('bannerimage.get');
Route::delete('/banners/{id}', [BannerImageController::class, 'destroy'])->name('bannerimage.destroy');


Route::post('/addgalleryimage', [GalleryImageController::class, 'store'])->name('galleryimage.store'); 
Route::delete('/gallery/{id}', [GalleryImageController::class, 'destroy'])->name('galleryimage.destroy'); 


Route::post('/companyaboutus', [AboutUsController::class, 'store'])->name('companyaboutus.store'); 

Route::post('/addemployee', [EmployeeDataController::class, 'store'])->name('employee.store'); 
Route::post('/updateemployee/{id}', [EmployeeDataController::class, 'update'])->name('employee.update');
Route::delete('/deleteemployee/{id}', [EmployeeDataController::class, 'destroy'])->name('employee.destroy'); 


});

Route::get('/getemployees', [EmployeeDataController::class, 'index'])->name('employee.index'); 

Route::get('/companyaboutus', [AboutUsController::class, 'index'])->name('companyaboutus.get'); 

Route::get('/getbannerimage', [BannerImageController::class, 'index'])->name('bannerimage.get');

Route::get('/getgalleryimage', [GalleryImageController::class, 'index'])->name('galleryimage.get'); 

Route::get('/getfeaturedproduct', [FeaturedProductController::class, 'index'])->name('featuredproduct.get'); 

Route::get('/getbestdealproduct', [BestDealProductController::class, 'index'])->name('bestdealproduct.get'); 

Route::get('/getnewarrivalproduct', [NewArrivalProductController::class, 'index'])->name('newarrivalproduct.get'); 

Route::get('/getonsaleproduct', [OnsaleProductController::class, 'index'])->name('onsaleproduct.get'); 




Route::get('/categoryWithCount', [CategoryController::class, 'categoriesWithItems'])->name('category.items');


Route::get('/getlatestproduct', [ProductController::class, 'getLatestProducts'])->name('products.latest');

Route::get('/gettopcategorywithproducts', [CategoryController::class, 'getTopCategoriesWithProducts'])->name('topcategories.data');


Route::get('/getcategorywithtypes', [CategoryController::class, 'getCategoriesWithTypes'])->name('categorytypes.data');

    /////////////

    // Route::get('getadminsdata', [AdminController::class, 'getAdmins'])->name('admin.getadmins'); 
    // Route::post('admin/destroy', [AdminController::class, 'destroy'])->name('admin.destroy');

    ////////////








//***/


// Route::get('/', function() {
//     return Inertia::render('Main/Home', ['componentName' => 'Home']);
// });

Route::get('/', function() {
    $userAgent = request()->header('User-Agent');

    // Comprehensive bot detection
    $bots = ['bot', 'crawl', 'spider', 'googlebot', 'bingbot', 'yandexbot', 'duckduckbot'];
    if ($userAgent && Str::contains(strtolower($userAgent), $bots)) {
        return response()->view('seo.home');
    }

    return Inertia::render('Main/Home', ['componentName' => 'Home']);
});


Route::get('/productcomparison', function() {
    return Inertia::render('Main/ProductComparison', ['componentName' => 'ProductComparison']);
});




Route::get('/shop', function(Request $request) {
    return Inertia::render('Main/ShopPage', [
        'componentName' => 'ShopPage', 
        'search' => $request->query('search', ''),
    ]);
})->name('shop');


Route::get('/aboutus', function(Request $request) {
    return Inertia::render('Main/MainAboutUs',['componentName' => 'MainAboutUs']);
});

Route::get('/ourteam', function(Request $request) {
    $employees = Employee::all();
    return Inertia::render('Main/MainOurTeam', ['componentName' => 'MainOurTeam', 
    'employees' => $employees]);
});

Route::get('/gallery', function(Request $request) {
    $galleryImage = GalleryImage::all();
    return Inertia::render('Main/MainOurGallery', ['componentName' => 'MainOurGallery', 
    'galleryimages' => $galleryImage]); 
});






Route::get('/getproduct', [ProductController::class, 'index'])->name('product.index');

Route::get('/getcategories', [CategoryController::class, 'index'])->name('categories.index'); 

Route::get('/topcategories', [CategoryController::class, 'topCategoriesWithMostProductTypes'])->name('topcategories.index');



Route::get('/getproducttype', [ProductTypeController::class, 'index'])->name('producttype.index'); 




Route::get('/getproductbrand', [BrandController::class, 'index'])->name('productbrand.index'); 




Route::get('/showproduct/{id}', [ProductController::class, 'show'])->name('product.show');











Route::get('/getlatestorders', [Ordercontroller::class, 'getLatestOrders'])->name('order.latest');















Route::get('/shop/{productSlug}', [ProductController::class, 'show'])->name('products.show');



Route::get('/sitemap.xml', function () {
    $products = DB::table('products')->select('product_name', 'updated_at')->get();

    $staticPages = [
        ['loc' => '/',                  'changefreq' => 'daily',   'priority' => '1.0'],
        ['loc' => '/shop',              'changefreq' => 'daily',   'priority' => '1.0'],
        ['loc' => '/aboutus',           'changefreq' => 'monthly', 'priority' => '0.7'],
        ['loc' => '/ourteam',           'changefreq' => 'monthly', 'priority' => '0.6'],
        ['loc' => '/gallery',           'changefreq' => 'weekly',  'priority' => '0.6'],
        ['loc' => '/productcomparison', 'changefreq' => 'weekly',  'priority' => '0.5'],
    ];

    $baseUrl = 'https://kelina.com.np';
    $today = now()->toDateString();

    $xml = '<?xml version="1.0" encoding="UTF-8"?>';
    $xml .= '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">';

    foreach ($staticPages as $page) {
        $xml .= "<url>";
        $xml .= "<loc>{$baseUrl}{$page['loc']}</loc>";
        $xml .= "<lastmod>{$today}</lastmod>";
        $xml .= "<changefreq>{$page['changefreq']}</changefreq>";
        $xml .= "<priority>{$page['priority']}</priority>";
        $xml .= "</url>";
    }

    foreach ($products as $product) {
        $slug = Str::slug($product->product_name);
        $lastmod = $product->updated_at
            ? \Carbon\Carbon::parse($product->updated_at)->toDateString()
            : $today;

        $xml .= "<url>";
        $xml .= "<loc>{$baseUrl}/shop/{$slug}</loc>";
        $xml .= "<lastmod>{$lastmod}</lastmod>";
        $xml .= "<changefreq>weekly</changefreq>";
        $xml .= "<priority>0.8</priority>";
        $xml .= "</url>";
    }

    $xml .= '</urlset>';

    return response($xml, 200)->header('Content-Type', 'application/xml');
});





Route::middleware('auth')->group(function () {


Route::get('/cart', function() {
    return Inertia::render('Main/CartPage', ['componentName' => 'CartPage']);
});

Route::get('/checkout', function() {
    return Inertia::render('Main/CheckoutPage', ['componentName' => 'CheckoutPage']);
});

Route::get('/userprofile', function() {
    return Inertia::render('Main/UserProfile', ['componentName' => 'UserProfile']);
});






Route::post('/addwishlistitem',[WishlistController::class, 'store'])->name('wishlist.store'); 
Route::get('/removewishlist/{id}',[WishlistController::class, 'destroy'])->name('wishlist.destroy');

Route::get('/wishlist/{userId}',[WishlistController::class, 'index'])->name('wishlist.index');

Route::post('/applypromocode', [PromoCodeController::class, 'apply'])->name('promocode.apply');
Route::post('/validatepromocode', [PromoCodeController::class, 'validate'])->name('promocode.validate');


Route::post('/fetchorderbyuser', [OrderController::class, 'fetchOrdersByUser'])->name('order.user');

Route::post('/addorders', [OrderController::class, 'store'])->name('order.store'); 


Route::post('/cancelorder', [OrderController::class, 'cancelOrder'])->name('order.cancel');





});
///** */


///////////////


//** */

//***/

// Route::get('/dashboard', function () {
//     return Inertia::render('Dashboard');
// })->middleware(['auth', 'verified'])->name('dashboard');

// Route::middleware('auth')->group(function () {
//     Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
//     Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
//     Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
// });

require __DIR__.'/auth.php';
