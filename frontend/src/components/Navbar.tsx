// 'use client';

// import Link from 'next/link';
// import { usePathname } from 'next/navigation';
// import { UserButton, SignedIn, SignedOut, useUser } from '@clerk/nextjs';

// export default function Navbar() {
//   const { user, isLoaded } = useUser();
//   const pathname = usePathname();

//   const role = user?.publicMetadata?.role as string;
//   const isAdmin = role === 'admin';
//   const isDispatcher = role === 'dispatcher';

//   // Helper to highlight active links
//   const isActive = (path: string) => 
//     pathname === path 
//       ? "text-xs font-bold text-[#5465FF]" 
//       : "text-xs font-medium text-slate-500 hover:text-slate-900 transition-colors";

//   return (
//     <header className="w-full bg-white/80 backdrop-blur-md border-b border-slate-100 sticky top-0 z-50">
//       <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
        
//         {/* Logo */}
//         <Link href="/" className="flex items-center gap-2 group">
//           <div className="w-8 h-8 bg-slate-900 rounded-[6px] flex items-center justify-center transition-transform group-hover:scale-95 shadow-lg shadow-slate-900/20">
//             <div className="w-2.5 h-4 bg-emerald-400 rounded-[2px]"></div>
//           </div>
//           <span className="text-lg font-bold tracking-tight text-slate-900">Tracker</span>
//         </Link>

//         {/* Navigation */}
//         <nav className="hidden md:flex items-center gap-8">
//           <Link href="/" className={isActive('/')}>Home</Link>
//           <Link href="/features" className={isActive('/features')}>Features</Link>
//           <Link href="/about" className={isActive('/about')}>About</Link>
//           <Link href="/pricing" className={isActive('/pricing')}>Pricing</Link>
//           {isLoaded && user && (
//             <>
//               {isAdmin && (
//                 <Link 
//                   href="/admin" 
//                   className="flex items-center gap-2 px-3 py-1.5 bg-red-50 text-red-600 rounded-md border border-red-100 hover:bg-red-100 transition-all shadow-sm"
//                 >
//                   <span className="text-sm">🛡️</span>
//                   <span className="text-[11px] font-bold uppercase tracking-wider">Admin Panel</span>
//                 </Link>
//               )}

//               {(isDispatcher || isAdmin) && (
//                 <Link 
//                   href="/dispatcher/live-map" 
//                   className="flex items-center gap-2 px-3 py-1.5 bg-indigo-50 text-indigo-600 rounded-md border border-indigo-100 hover:bg-indigo-100 transition-all shadow-sm"
//                 >
//                   <span className="text-sm">🖥️</span>
//                   <span className="text-[11px] font-bold uppercase tracking-wider">Dispatcher Panel</span>
//                 </Link>
//               )}
//             </>
//           )}
//         </nav>

       
//         <div className="flex items-center gap-4">
        
//           <SignedIn>
//             <div className="flex items-center gap-3">
//                 <span className="text-xs font-medium text-slate-500 hidden sm:block">My Account</span>
                
//                 <UserButton 
//                   appearance={{
//                     elements: {
//                       avatarBox: "w-9 h-9 border border-slate-200"
//                     }
//                   }}
//                 />
//             </div>
//           </SignedIn>

//           {/* LOGGED OUT: Show Buttons */}
//           <SignedOut>
//             <Link href="/sign-in">
//               <button className="text-xs font-bold text-slate-600 hover:text-[#5465FF] px-4 py-2 transition-colors">
//                 Log in
//               </button>
//             </Link>
            
//             <Link href="/sign-up">
//               <button className="bg-[#5465FF] hover:bg-indigo-600 text-white text-xs font-bold px-5 py-2.5 rounded-full transition-all shadow-lg shadow-indigo-500/20 active:scale-95">
//                 Create Account
//               </button>
//             </Link>
//           </SignedOut>

//         </div>
//       </div>
//     </header>
//   );
// }


'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { UserButton, SignedIn, SignedOut, useUser } from '@clerk/nextjs';

export default function Navbar() {
  const { user, isLoaded } = useUser();
  const pathname = usePathname();

  const role = user?.publicMetadata?.role as string;
  const isAdmin = role === 'admin';
  const isDispatcher = role === 'dispatcher';
  const isDriver = role === 'driver';

  // Helper updated for bigger text and unified styling
  const isActive = (path: string) => 
    pathname === path 
      ? "text-[15px] font-bold text-[#5465FF] tracking-tight" 
      : "text-[15px] font-semibold text-slate-500 hover:text-slate-900 transition-all tracking-tight";

  return (
    <header className="w-full bg-white/80 backdrop-blur-md border-b border-slate-100 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
        
        {/* Logo (Untouched) */}
        <Link href="/" className="flex items-center gap-2 group">
          <div className="w-8 h-8 bg-slate-900 rounded-[6px] flex items-center justify-center transition-transform group-hover:scale-95 shadow-lg shadow-slate-900/20">
            <div className="w-2.5 h-4 bg-emerald-400 rounded-[2px]"></div>
          </div>
          <span className="text-lg font-bold tracking-tight text-slate-900">Tracker</span>
        </Link>

        {/* Navigation - Unified and Clean */}
        <nav className="hidden md:flex items-center gap-10">
          <Link href="/" className={isActive('/')}>Home</Link>
          <Link href="/features" className={isActive('/features')}>Features</Link>
          <Link href="/about" className={isActive('/about')}>About</Link>
          <Link href="/pricing" className={isActive('/pricing')}>Pricing</Link>
          
          {isLoaded && user && (
            <>
              {isAdmin && (
                <Link href="/admin" className={isActive('/admin')}>
                  Admin Panel
                </Link>
              )}

              {(isDispatcher || isAdmin) && (
                <Link href="/dispatcher/live-map" className={isActive('/dispatcher/live-map')}>
                  Dispatcher Panel
                </Link>
              )}

              {isDriver && (
                <Link href="/driver" className={isActive('/driver')}>
                  Driver Dashboard
                </Link>
              )}
            </>
          )}
        </nav>

        <div className="flex items-center gap-4">
          
          <SignedIn>
            <div className="flex items-center gap-3">
                
                <span className="text-[15px] font-semibold text-slate-500 hidden sm:block tracking-tight">
                  My Account
                </span>
                
                <UserButton 
                  appearance={{
                    elements: {
                      avatarBox: "w-9 h-9 border border-slate-200"
                    }
                  }}
                />
            </div>
          </SignedIn>

          <SignedOut>
            <Link href="/sign-in">
              <button className="text-[15px] font-bold text-slate-600 hover:text-[#5465FF] px-4 py-2 transition-colors tracking-tight">
                Log in
              </button>
            </Link>
            
            <Link href="/sign-up">
              <button className="bg-[#5465FF] hover:bg-indigo-600 text-white text-[15px] font-bold px-6 py-2.5 rounded-full transition-all shadow-lg shadow-indigo-500/20 active:scale-95 tracking-tight">
                Create Account
              </button>
            </Link>
          </SignedOut>

        </div>
      </div>
    </header>
  );
}