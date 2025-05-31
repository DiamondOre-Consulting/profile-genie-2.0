import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { portfolioResponse } from '@/validations/PortfolioValidation';
import { X } from 'lucide-react';
import { IconX } from '@tabler/icons-react';

gsap.registerPlugin(ScrollTrigger);

interface Service {
    title?: string;
    detail?: string;
    image?: {
        url?: string;
    };
}

const Services = ({ portfolioData }: { portfolioData: portfolioResponse }) => {
    const servicesRef = useRef<(HTMLDivElement | null)[]>([]);

    const [activeService, setActiveService] = useState<Service|null>(null);

    useEffect(() => {
        servicesRef.current.forEach((el, index) => {
            if (el) {
                gsap.fromTo(
                    el,
                    { opacity: 0, y: 50 },
                    {
                        opacity: 1,
                        y: 0,
                        scrollTrigger: {
                            trigger: el,
                            start: 'top 80%',
                            end: 'top 30%',
                            toggleActions: 'play none none reverse',
                        },
                        delay: index * 0.2,
                        duration: 1,
                    }
                );
            }
        });
    }, []);

    return (
        <>

{activeService && (
            <div className="fixed inset-0 z-50 flex items-center justify-center backdrop-blur-sm bg-black/50">
                <div
                    className="w-[96vw] max-w-[30rem] md:max-w-[70rem] relative  max-h-[90vh] bg-white rounded-lg shadow-lg overflow-hidden"
                    onWheel={e => e.stopPropagation()}
                >
                    <div
                        onClick={() => setActiveService(null)}
                        className="absolute flex items-center justify-center bg-red-100 rounded-md shadow-lg cursor-pointer z-1 w-9 h-9 top-1 right-1"
                    >
                        <IconX className="w-6 h-6 text-red-500" />
                    </div>
                    <div className="flex flex-col h-full md:flex-row">
                        <div className="sticky top-0 flex-shrink-0 w-full h-[15rem] md:w-[45%] lg:w-[30rem] md:h-[26rem]">
                            <img
                                src={activeService.image?.url}
                                alt={activeService.title}
                                className="w-full h-[15rem] md:h-[26rem] object-cover"
                            />
                        </div>
                        <div
                            className="flex-1 p-4 overflow-y-auto md:py-10 md:pr-8 lg:pr-15"
                            style={{
                                maxHeight: '26rem',
                                msOverflowStyle: 'none',
                            }}
                            onWheel={e => e.stopPropagation()}
                        >
                            <style>
                                {`
                                    .no-scrollbar::-webkit-scrollbar {
                                        display: none;
                                    }
                                `}
                            </style>
                            <h2 className="mb-4 text-2xl font-bold  md:text-3xl">{activeService.title}</h2>
                            <p dangerouslySetInnerHTML={{ __html: activeService.detail || '' }}></p>
                Lorem ipsum dolor sit, amet consectetur adipisicing elit. Modi blanditiis tenetur esse libero tempore consectetur, quidem eaque deserunt facilis voluptas rem reiciendis at eveniet praesentium. Harum ducimus ab quaerat nisi animi voluptas iure quam adipisci, eius fugiat pariatur, enim eos ratione soluta, inventore aut modi amet id! Perspiciatis, debitis? Modi enim suscipit ducimus odit a adipisci nihil ipsum nam fugit nesciunt porro libero delectus maiores accusamus laudantium voluptas fugiat commodi facilis excepturi quisquam hic tempore, debitis provident dolor! Culpa commodi dignissimos perferendis delectus adipisci dolores, ut ab et. Quo in molestiae voluptatibus aliquid quidem, vel illum repellat reprehenderit nihil voluptates sint veniam. Facere, nostrum, unde modi delectus mollitia temporibus ut ad eum labore at numquam. Aspernatur necessitatibus porro nisi iusto nesciunt aliquam consequatur ipsam fugit dolorem, laborum provident alias dignissimos dicta quisquam sapiente atque quasi cupiditate saepe enim vero illo. Eos, suscipit inventore. Non molestiae repellat esse incidunt delectus praesentium placeat saepe nostrum minima. Nisi expedita velit reprehenderit nam cupiditate? Quos excepturi numquam sint iusto aspernatur quia eveniet animi minima perferendis ipsa. Ea quia quae, autem, ipsum corporis ratione sit quaerat eveniet quod adipisci vitae ducimus. Aliquid, eum. Harum beatae tempora delectus aliquid impedit commodi quae molestias quos optio molestiae illum, nobis ut exercitationem in, veritatis vel ducimus labore dolorum eaque odio inventore! Natus similique asperiores, omnis perferendis odit incidunt nam quo nisi dignissimos aliquam dolor qui possimus earum, dolores quos eveniet optio quidem eos, recusandae placeat! Quaerat culpa accusamus reprehenderit repellendus ex nam, tempore cum ipsa architecto nostrum quasi fugit, ad eligendi, odio suscipit vitae corrupti adipisci eum beatae esse! Unde eos natus, fugit fuga nisi, dolorum error dolor culpa voluptates voluptatum esse dolorem labore quas eaque omnis et libero ipsum laborum saepe quis repellat animi consequatur. Accusamus commodi ad dolorem repudiandae rem rerum? Ea omnis facilis rerum praesentium recusandae minus placeat laborum fuga? Ratione deserunt consequatur voluptates quaerat soluta aut laboriosam dolore? Numquam voluptatum laudantium distinctio natus repellat. Rem explicabo dolore velit cumque ut commodi iste sapiente minus, similique, aliquid unde cupiditate alias deleniti illo mollitia! Vitae aut quisquam quis, magnam quo dicta officia omnis voluptate et consectetur magni tempora iure similique quia voluptas autem vero necessitatibus ratione, iste eligendi minima maxime id? Impedit quam praesentium accusamus tempora ipsa earum deserunt, quia repellat, fugiat laudantium ex neque itaque. In expedita asperiores amet, blanditiis ducimus repudiandae numquam labore, nostrum quod molestias soluta necessitatibus tempore omnis vero quam provident. Unde pariatur illum distinctio repellat provident maiores eligendi tempora est dolor hic accusantium labore quo nulla dicta alias quas, quis sunt dolore debitis doloremque sit? Ullam quod excepturi officiis praesentium voluptates libero eligendi, maiores vitae officia sint iusto consequatur minima qui, ipsam iure pariatur ex sit adipisci tempore mollitia! Repellendus iure deserunt possimus doloremque nobis? Nihil iure ab quam, distinctio praesentium quis error ducimus harum ipsa quas, quia ut nesciunt fugit accusantium exercitationem rem deleniti, hic nemo aspernatur laudantium dolor tenetur facere aut. Suscipit consectetur reprehenderit exercitationem cupiditate fuga. Aliquid ut repellat expedita sapiente ad, libero quas inventore dignissimos consequatur recusandae quia. Doloremque porro pariatur eius, et atque reprehenderit suscipit, fuga nostrum omnis, nesciunt cupiditate qui rerum. Sunt odio minima tempora debitis adipisci earum, eligendi neque dolor culpa quis, doloribus expedita ipsam voluptate molestiae, asperiores nam modi nihil esse necessitatibus! Ullam explicabo neque voluptas adipisci doloribus. Dolorem alias illum veniam enim soluta? Distinctio laboriosam sint ratione exercitationem facere iste rem quasi aspernatur sunt, illo tenetur corrupti labore vitae ipsum asperiores dolorem doloribus expedita sit temporibus voluptate? Repudiandae placeat dolorum explicabo magni sint accusantium autem quos temporibus ducimus, molestias accusamus odio dolorem consectetur voluptas? Quaerat non sed eligendi quod voluptatum beatae doloremque nobis veniam velit impedit explicabo incidunt magnam facilis sunt cum quas, fugiat ducimus reprehenderit. Consequuntur saepe rem veniam aperiam labore soluta cupiditate et enim quam, ex maiores commodi voluptatum, aliquid in consequatur nam facere fugit quis cum quas vitae vel fuga. Porro, ipsa facere ipsam dolores, vitae deleniti ea quidem voluptate accusamus rem quos ab nemo facilis quibusdam! Quo nihil labore, quod at quis dolore, quae impedit provident, expedita accusantium fugit recusandae. Minima laudantium quam odio debitis voluptas sunt sequi molestias sed dolores tempore. Architecto culpa corrupti sequi vero reprehenderit dolorum perferendis dolor dignissimos illo iure deserunt ipsum neque tempora, esse nihil commodi numquam rem iste praesentium quia cum. In, deleniti id! Quas amet in quisquam, quasi quam accusamus minima totam ex voluptas voluptatibus, et doloribus blanditiis consectetur. Iure odio quia vitae optio adipisci quas nam cumque natus, dignissimos illo! Expedita tenetur officiis veniam facere recusandae fuga, quidem aspernatur eum ea? Repellendus, maxime. Ipsam cum repellendus rerum quia sequi, ex placeat illum id numquam sapiente ipsa, qui alias quas nihil voluptatem eaque veritatis maiores, voluptas pariatur ratione quisquam. Earum, eligendi quaerat! Eaque magni dolorum quibusdam recusandae omnis ipsa maiores accusamus assumenda, error vitae accusantium mollitia qui dolor rem. Voluptas animi soluta cum reiciendis sint omnis dolores ut eaque vitae. Reprehenderit necessitatibus voluptatibus eligendi reiciendis soluta quos repellendus autem, consectetur mollitia dignissimos molestiae laboriosam numquam quidem praesentium debitis magni repellat, temporibus architecto placeat nihil sed maxime labore quas quod. Laudantium aliquid fuga ab cupiditate, velit ut adipisci a eaque voluptate, sapiente nulla officia rerum fugiat eius impedit necessitatibus quis laborum qui! Itaque rerum ad iure! Aut ipsa quibusdam non. Similique maiores sapiente eum aliquid molestiae distinctio enim quia iusto at, blanditiis vitae eaque iure, fugiat quae nihil autem asperiores sit quod doloribus dolores? Libero quod similique possimus aperiam vel. Vero deserunt, cumque facilis laborum sequi accusantium molestiae ipsum quibusdam doloribus sunt natus sed accusamus officia soluta, perferendis nostrum magnam, veritatis quia. Quidem esse, debitis magni molestiae ut aliquid quo ipsum quam dicta voluptatibus aperiam sed excepturi nihil? Veritatis odio blanditiis voluptatibus cupiditate optio unde possimus, assumenda vitae quasi incidunt distinctio expedita, minus numquam nam aperiam iusto, molestias ducimus id voluptas? Amet nobis facere dicta maxime voluptates dolorum perferendis expedita maiores exercitationem repellendus at inventore quasi deleniti sequi praesentium, dolore ea earum tempore, qui minus consequatur quam. Nam accusamus praesentium vel tenetur aspernatur asperiores officia ipsam accusantium numquam. Dolorem qui quidem sed.
                        </div>
                    </div>
                </div>
            </div>)}

            {portfolioData?.otherDetails?.services?.serviceList && portfolioData?.otherDetails?.services?.serviceList?.length > 0 && (
                <div className="w-full max-w-screen-xl px-4 pt-20 mx-auto md:px-10" id='service'>
                    <div className='w-full mb-20 md:w-fit'>
                        <h1 className="text-4xl font-bold text-left md:text-5xl md:text-6xl">
                            {portfolioData?.otherDetails?.services?.tagline || "Our Services"}
                        </h1>
                    </div>

                    <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
                        {portfolioData?.otherDetails?.services?.serviceList?.map((service, index) => (
                            <div
                                key={index}
                                ref={el => {
                                    if (el) servicesRef.current[index] = el;
                                }}
                                className="flex flex-col justify-between h-full overflow-hidden transition-shadow duration-300 border border-gray-300 rounded-md shadow-md hover:shadow-lg"
                            >
                                <img src={service?.image?.url} alt={service?.title} className='aspect-[4/2.3] w-full object-cover' />
                                <div className="px-4 py-2">
                                    <h2 className="mb-2 text-xl font-bold md:text-2xl">{service?.title || ''}</h2>
                                <p className="text-sm md:text-base line-clamp-5" dangerouslySetInnerHTML={{ __html: service?.detail || '' }}></p>
                                </div>
                                <button onClick={()=>setActiveService(service)} className='bg-[#c026d3] m-3 mt-2  p-2 text-white font-semibold cursor-pointer rounded'>Learn More</button>
                            </div>
                        ))}
                    </div>
                </div>
            )}
        </>
    );
};

export default Services;
