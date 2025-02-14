'use client';
import SidebarMenuItem from './SideBarMenuItem';
import { usePathname } from 'next/navigation';
import Link from 'next/link';
import { logout } from '@/lib/auth-client';

export function SideBar(props) {
    const pathname = usePathname();

    const menuItems = [
        { icon: "https://cdn.builder.io/api/v1/image/assets/TEMP/1d45c25cd527707367cc4b9fb6af8a0590044c9719e37a6a29cf594998adcf0a?placeholderIfAbsent=true&apiKey=d0f9034d0dc44b1aab58ff0a1da9e3b1", label: "Dashboard", href:"/dashboard" },
        { icon: "https://cdn.builder.io/api/v1/image/assets/TEMP/209da8dbaaaf8662f98ca521e9bc3407aece84b0363c62b7d0e0191f9d6a20b1?placeholderIfAbsent=true&apiKey=d0f9034d0dc44b1aab58ff0a1da9e3b1", label: "Administrator", href:"/dashboard/administrator" },
        { icon: "https://cdn.builder.io/api/v1/image/assets/TEMP/c7ca99aaaf3b5eae8f0de363eaddf7727e0411ff844578abaaca4a415414d3c4?placeholderIfAbsent=true&apiKey=d0f9034d0dc44b1aab58ff0a1da9e3b1", label: "Company Profile", href:"/dashboard/company-profile" },
        { icon: "https://cdn.builder.io/api/v1/image/assets/TEMP/9686ea811d0b0acd947ee477b82f2bcedc7a56a136ce3271633560a500706d11?placeholderIfAbsent=true&apiKey=d0f9034d0dc44b1aab58ff0a1da9e3b1", label: "Group Company", href:"/dashboard/group-company" },
        { icon: "https://cdn.builder.io/api/v1/image/assets/TEMP/9f4ecd522f5b0c12661a44ac58951bc08d60480c12147d5860cb017a4e5454bd?placeholderIfAbsent=true&apiKey=d0f9034d0dc44b1aab58ff0a1da9e3b1", label: "Global Network", href:"/dashboard/global-network" },
        { icon: "https://cdn.builder.io/api/v1/image/assets/TEMP/ffba14f90ceb7f91385b1741aa38958cb4d4ae418a7d80709bbd9dd5eef98b45?placeholderIfAbsent=true&apiKey=d0f9034d0dc44b1aab58ff0a1da9e3b1", label: "Category Product", href:"/dashboard/category-product" },
        { icon: "https://cdn.builder.io/api/v1/image/assets/TEMP/ffba14f90ceb7f91385b1741aa38958cb4d4ae418a7d80709bbd9dd5eef98b45?placeholderIfAbsent=true&apiKey=d0f9034d0dc44b1aab58ff0a1da9e3b1", label: "Category Product Photo", href:"/dashboard/category-product-photo" },
        { icon: "https://cdn.builder.io/api/v1/image/assets/TEMP/4cbf224502a6eb6ea1991c6cf22cb594715bf45dfb4f53c0d09a6578a8d44935?placeholderIfAbsent=true&apiKey=d0f9034d0dc44b1aab58ff0a1da9e3b1", label: "Product", href:"/dashboard/product" },
        { icon: "https://cdn.builder.io/api/v1/image/assets/TEMP/1323f82eadc489c0d85909eb6ac55256af17650d6e2ef01d5035342a7aa9f053?placeholderIfAbsent=true&apiKey=d0f9034d0dc44b1aab58ff0a1da9e3b1", label: "News", href:"/dashboard/news" },
        { icon: "https://cdn.builder.io/api/v1/image/assets/TEMP/a21d059a66ddbe1609b44647ff109515bcb4ddf897eaa0621be9d8ba7148562d?placeholderIfAbsent=true&apiKey=d0f9034d0dc44b1aab58ff0a1da9e3b1", label: "Message", href:"/dashboard/message" },
        { icon: "https://cdn.builder.io/api/v1/image/assets/TEMP/04bd1720872a78bcc1ca372150d46999b84bc578f071a9908753947a3455e13e?placeholderIfAbsent=true&apiKey=d0f9034d0dc44b1aab58ff0a1da9e3b1", label: "Service Team", href:"/dashboard/service-team" },
        { icon: "https://cdn.builder.io/api/v1/image/assets/TEMP/1905745f849a625e22caf772d87edc83772cf52fc175b575ed0e0a3b6553af80?placeholderIfAbsent=true&apiKey=d0f9034d0dc44b1aab58ff0a1da9e3b1", label: "Landing Page", href:"/dashboard/landing-page" },
        // { icon: "https://cdn.builder.io/api/v1/image/assets/TEMP/7db5840cc91abd9984ab5a9f25cdcdc33b14ac6329d5c02e03e7e0b9c67dd93a?placeholderIfAbsent=true&apiKey=d0f9034d0dc44b1aab58ff0a1da9e3b1", label: "Landing Page Preview", href:"/dashboard/landing-page-preview" },
      ];
      const handleLogout = async () => {
        await logout();
      };
    
    return (
        <aside className="flex flex-col w-[18%] max-md:ml-0 max-md:w-full" style={{backgroundImage: 'linear-gradient(135deg, rgba(53,112,73,1) 0%, rgba(179,179,179,1) 140%)', borderRadius:'24px'}}>
            <div className="flex overflow-hidden flex-col grow justify-center px-7 py-12 rounded-3xl max-md:px-5 max-md:mt-10">
            <div className="flex flex-col justify-between w-full min-h-[864px]">
                <div className="flex flex-col w-full">
                <div className="flex flex-col justify-center self-center p-3 max-w-full bg-white rounded-lg w-[179px]">
                    <img
                    loading="lazy"
                    src="https://cdn.builder.io/api/v1/image/assets/TEMP/10a0843a25776cfbd5cfa818e037a2dc0e3153681cc5bac4682906485a85dbad?placeholderIfAbsent=true&apiKey=d0f9034d0dc44b1aab58ff0a1da9e3b1"
                    alt="Company Logo"
                    className="object-contain w-full aspect-[5.15]"
                    />
                </div>
                <nav className="flex flex-col justify-center mt-12 w-full text-sm text-white max-md:mt-10">
                {menuItems.map((item) => (
                    <Link href={item.href} key={item.label}>
                    <SidebarMenuItem
                        icon={item.icon}
                        label={item.label}
                        active={pathname === item.href}
                    />
                    </Link>
                ))}
                </nav>
                </div>
                <button 
                className="flex justify-center items-center self-center mt-20 w-full text-base text-center text-white whitespace-nowrap rounded-lg max-w-[180px] max-md:mt-10"
                aria-label="Logout from dashboard"
                >
                <div className="flex flex-1 shrink gap-2.5 justify-center items-center self-stretch p-3 my-auto w-full basis-0">
                    <div className="flex flex-1 shrink gap-3 justify-center items-center self-stretch my-auto w-full basis-0">
                    <img
                        loading="lazy"
                        src="https://cdn.builder.io/api/v1/image/assets/TEMP/be78d3f988ddf7e074783090bb16924e791a5c2a1ef3f14edb1749e389f9fc93?placeholderIfAbsent=true&apiKey=d0f9034d0dc44b1aab58ff0a1da9e3b1"
                        alt=""
                        className="object-contain shrink-0 self-stretch my-auto w-6 aspect-square"
                    />
                    <span className="self-stretch my-auto" onClick={handleLogout}>Logout</span>
                    </div>
                </div>
                </button>
            </div>
            </div>
        </aside>
    )
}