import React, {SetStateAction, useEffect, useState, Dispatch, ReactElement} from 'react';
import './SiteWrap.css';
import SlideImageLeft from "./SlideImageLeft";
import SlideImageRight from "./SlideImageRight";

function debounce(func: () => void, wait = 20, immediate = true): () => void {
    let timeout: null | number = null;
    return function () {
        const later = function () {
            timeout = null;
            if (!immediate) func();
        };
        const callNow = immediate && !timeout;
        if(timeout !== null) clearTimeout(timeout);
        timeout = window.setTimeout(later, wait);
        if (callNow) func();
    };
};

type Dispatcher<E> = Dispatch<SetStateAction<E>>;

function SiteWrap(): ReactElement {
    const [active, setActive]: [boolean[], Dispatcher<boolean[]>] = useState(Array(5).fill(false));
    const refs: (HTMLImageElement | null)[] = [];

    useEffect((): () => void => {
        function checkSlide(): void {
            let tmp: boolean[] = [...active];
            refs.forEach((sliderImageRef: HTMLImageElement | null, i: number): void => {
                if (sliderImageRef === null) return;
                // half way through the image
                const slideInAt: number = (window.scrollY + window.innerHeight) - sliderImageRef.height / 2;
                // bottom of the image
                const imageBottom: number = sliderImageRef.offsetTop + sliderImageRef.height;
                const isHalfShown: boolean = slideInAt > sliderImageRef.offsetTop;
                const isNotScrolledPast: boolean = window.scrollY < imageBottom;
                if (isHalfShown && isNotScrolledPast) {
                    tmp = [
                        ...tmp.slice(0, i),
                        true,
                        ...tmp.slice(i + 1)
                    ]
                    // sliderImageRef.classList.add('active');
                } else {
                    tmp = [
                        ...tmp.slice(0, i),
                        false,
                        ...tmp.slice(i + 1)
                    ]
                }
            });
            setActive(tmp);
        }

        const debounced: () => void = debounce(checkSlide);
        window.addEventListener('scroll', debounced);

        return (): void => {
            window.removeEventListener('scroll', debounced);
        }
    }, [active, refs]);

    return <div className="site-wrap">
        <h1>Slide in on Scroll</h1>

        <p>Consectetur adipisicing elit. Tempore tempora rerum, est autem cupiditate, corporis a qui libero ipsum
            delectus quidem dolor at nulla, adipisci veniam in reiciendis aut asperiores omnis blanditiis quod quas
            laborum nam! Fuga ad tempora in aspernatur pariaturlores sunt esse magni, ut, dignissimos.</p>
        <p>Lorem ipsum cupiditate, corporis a qui libero ipsum delectus quidem dolor at nulla, adipisci veniam in
            reiciendis aut asperiores omnis blanditiis quod quas laborum nam! Fuga ad tempora in aspernatur pariatur
            fugit quibusdam dolores sunt esse magni, ut, dignissimos.</p>
        <p>Adipisicing elit. Tempore tempora rerum..</p>
        <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Tempore tempora rerum, est autem cupiditate,
            corporis a qui libero ipsum delectus quidem dolor at nulla, adipisci veniam in reiciendis aut asperiores
            omnis blanditiis quod quas laborum nam! Fuga ad tempora in aspernatur pariatur fugit quibusdam dolores sunt
            esse magni, ut, dignissimos.</p>
        <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Tempore tempora rerum, est autem cupiditate,
            corporis a qui libero ipsum delectus quidem dolor at nulla, adipisci veniam in reiciendis aut asperiores
            omnis blanditiis quod quas laborum nam! Fuga ad tempora in aspernatur pariatur fugit quibusdam dolores sunt
            esse magni, ut, dignissimos.</p>
        <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Tempore tempora rerum, est autem cupiditate,
            corporis a qui libero ipsum delectus quidem dolor at nulla, adipisci veniam in reiciendis aut asperiores
            omnis blanditiis quod quas laborum nam! Fuga ad tempora in aspernatur pariatur fugit quibusdam dolores sunt
            esse magni, ut, dignissimos.</p>

        <SlideImageLeft ref={(ref: HTMLImageElement | null) => refs.push(ref)} src="http://unsplash.it/400/400" active={active[0]}/>

        <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Voluptates, deserunt facilis et iste corrupti
            omnis tenetur est. Iste ut est dicta dolor itaque adipisci, dolorum minima, veritatis earum provident
            error molestias. Ratione magni illo sint vel velit ut excepturi consectetur suscipit, earum modi
            accusamus voluptatem nostrum, praesentium numquam, reiciendis voluptas sit id quisquam. Consequatur in
            quis reprehenderit modi perspiciatis necessitatibus saepe, quidem, suscipit iure natus dignissimos
            ipsam, eligendi deleniti accusantium, rerum quibusdam fugit perferendis et optio recusandae sed ratione.
            Culpa, dolorum reprehenderit harum ab voluptas fuga, nisi eligendi natus maiores illum quas quos et
            aperiam aut doloremque optio maxime fugiat doloribus. Eum dolorum expedita quam, nesciunt</p>

        <SlideImageRight ref={(ref: HTMLImageElement | null) => refs.push(ref)} src="http://unsplash.it/400/401" active={active[1]}/>

        <p> at provident praesentium atque quas rerum optio dignissimos repudiandae ullam illum quibusdam. Vel
            ad error quibusdam, illo ex totam placeat. Quos excepturi fuga, molestiae ea quisquam minus, ratione
            dicta consectetur officia omnis, doloribus voluptatibus? Veniam ipsum veritatis architecto,
            provident quas consequatur doloremque quam quidem earum expedita, ad delectus voluptatum, omnis
            praesentium nostrum qui aspernatur ea eaque adipisci et cumque ab? Ea voluptatum dolore itaque odio.
            Eius minima distinctio harum, officia ab nihil exercitationem. Tempora rem nemo nam temporibus
            molestias facilis minus ipsam quam doloribus consequatur debitis nesciunt tempore officiis aperiam
            quisquam, molestiae voluptates cum, fuga culpa. Distinctio accusamus quibusdam, tempore perspiciatis
            dolorum optio facere consequatur quidem ullam beatae architecto, ipsam sequi officiis dignissimos
            amet impedit natus necessitatibus tenetur repellendus dolor rem! Dicta dolorem, iure, facilis illo
            ex nihil ipsa amet officia, optio temporibus eum autem odit repellendus nisi. Possimus modi,
            corrupti error debitis doloribus dicta libero earum, sequi porro ut excepturi nostrum ea voluptatem
            nihil culpa? Ullam expedita eligendi obcaecati reiciendis velit provident omnis quas qui in corrupti
            est dolore facere ad hic, animi soluta assumenda consequuntur reprehenderit! Voluptate dolor nihil
            veniam laborum voluptas nisi pariatur sed optio accusantium quam consectetur, corrupti, sequi et
            consequuntur, excepturi doloremque. Tempore quis velit corporis neque fugit non sequi eaque rem hic.
            Facere, inventore, aspernatur. Accusantium modi atque, asperiores qui nobis soluta cumque suscipit
            excepturi possimus doloremque odit saepe perferendis temporibus molestiae nostrum voluptatum quis id
            sint quidem nesciunt culpa. Rerum labore dolor beatae blanditiis praesentium explicabo velit optio
            esse aperiam similique, voluptatem cum, maiores ipsa tempore. Reiciendis sed culpa atque inventore,
            nam ullam enim expedita consectetur id velit iusto alias vitae explicabo nemo neque odio
            reprehenderit soluta sint eaque. Aperiam, qui ut tenetur, voluptate doloremque officiis dicta
            quaerat voluptatem rerum natus magni. Eum amet autem dolor ullam.</p>

        <SlideImageLeft ref={(ref: HTMLImageElement | null) => refs.push(ref)} src="http://unsplash.it/200/500" active={active[2]}/>

        <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Distinctio maiores adipisci quibusdam
            repudiandae dolor vero placeat esse sit! Quibusdam saepe aperiam explicabo placeat optio,
            consequuntur nihil voluptatibus expedita quia vero perferendis, deserunt et incidunt
            eveniet <SlideImageRight ref={ref => refs.push(ref)} src="http://unsplash.it/200/200"
                                     active={active[3]}/> temporibus
            doloremque possimus facilis. Possimus labore, officia dolore! Eaque ratione saepe, alias
            harum laboriosam deserunt laudantium blanditiis eum explicabo placeat reiciendis labore iste
            sint. Consectetur expedita dignissimos, non quos distinctio, eos rerum facilis eligendi.
            Asperiores laudantium, rerum ratione consequatur, culpa consectetur possimus atque ab
            tempore illum non dolor nesciunt. Neque, rerum. A vel non incidunt, quod doloremque
            dignissimos necessitatibus aliquid laboriosam architecto at cupiditate commodi expedita in,
            quae blanditiis. Deserunt labore sequi, repellat laboriosam est, doloremque culpa reiciendis
            tempore excepturi. Enim nostrum fugit itaque vel corporis ullam sed tenetur ipsa qui rem
            quam error sint, libero. Laboriosam rem, ratione. Autem blanditiis</p>


        <p>laborum neque repudiandae quam, cumque, voluptate veritatis itaque, placeat veniam ad nisi.
            Expedita, laborum reprehenderit ratione soluta velit natus, odit mollitia. Corporis rerum minima
            fugiat in nostrum. Assumenda natus cupiditate hic quidem ex, quas, amet ipsum esse dolore
            facilis beatae maxime qui inventore, iste? Maiores dignissimos dolore culpa debitis voluptatem
            harum, excepturi enim reiciendis, tempora ab ipsam illum aspernatur quasi qui porro saepe iure
            sunt eligendi tenetur quaerat ducimus quas sequi omnis aperiam suscipit! Molestiae obcaecati
            officiis quo, ratione eveniet, provident pariatur. Veniam quasi expedita distinctio, itaque
            molestiae sequi, dolorum nisi repellendus quia facilis iusto dignissimos nam? Tenetur fugit quos
            autem nihil, perspiciatis expedita enim tempore, alias ab maiores quis necessitatibus distinctio
            molestias eum, quidem. Delectus impedit quidem laborum, fugit vel neque quo, ipsam, quasi
            aspernatur quas odio nihil? Veniam amet reiciendis blanditiis quis reprehenderit repudiandae
            neque, ab ducimus, odit excepturi voluptate saepe ipsam. Voluptatem eum error voluptas porro
            officiis, amet! Molestias, fugit, ut! Tempore non magnam, amet, facere ducimus accusantium eos
            veritatis neque.</p>

        <SlideImageRight ref={(ref: HTMLImageElement | null) => refs.push(ref)} src="http://unsplash.it/400/400" active={active[4]}/>

        <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Distinctio maiores adipisci
            quibusdam repudiandae dolor vero placeat esse sit! Quibusdam saepe aperiam explicabo placeat
            optio, consequuntur nihil voluptatibus expedita quia vero perferendis, deserunt et incidunt
            eveniet temporibus doloremque possimus facilis. Possimus labore, officia dolore! Eaque
            ratione saepe, alias harum laboriosam deserunt laudantium blanditiis eum explicabo placeat
            reiciendis labore iste sint. Consectetur expedita dignissimos, non quos distinctio, eos
            rerum facilis eligendi. Asperiores laudantium, rerum ratione consequatur, culpa consectetur
            possimus atque ab tempore illum non dolor nesciunt. Neque, rerum. A vel non incidunt, quod
            doloremque dignissimos necessitatibus aliquid laboriosam architecto at cupiditate commodi
            expedita in, quae blanditiis. Deserunt labore sequi, repellat laboriosam est, doloremque
            culpa reiciendis tempore excepturi. Enim nostrum fugit itaque vel corporis ullam sed tenetur
            ipsa qui rem quam error sint, libero. Laboriosam rem, ratione. Autem blanditiis laborum
            neque repudiandae quam, cumque, voluptate veritatis itaque, placeat veniam ad nisi.
            Expedita, laborum reprehenderit ratione soluta velit natus, odit mollitia. Corporis rerum
            minima fugiat in nostrum. Assumenda natus cupiditate hic quidem ex, quas, amet ipsum esse
            dolore facilis beatae maxime qui inventore, iste? Maiores dignissimos dolore culpa debitis
            voluptatem harum, excepturi enim reiciendis, tempora ab ipsam illum aspernatur quasi qui
            porro saepe iure sunt eligendi tenetur quaerat ducimus quas sequi omnis aperiam suscipit!
            Molestiae obcaecati officiis quo, ratione eveniet, provident pariatur. Veniam quasi expedita
            distinctio, itaque molestiae sequi, dolorum nisi repellendus quia facilis iusto dignissimos
            nam? Tenetur fugit quos autem nihil, perspiciatis expedita enim tempore, alias ab maiores
            quis necessitatibus distinctio molestias eum, quidem. Delectus impedit quidem laborum, fugit
            vel neque quo, ipsam, quasi aspernatur quas odio nihil? Veniam amet reiciendis blanditiis
            quis reprehenderit repudiandae neque, ab ducimus, odit excepturi voluptate saepe ipsam.
            Voluptatem eum error voluptas porro officiis, amet! Molestias, fugit, ut! Tempore non
            magnam, amet, facere ducimus accusantium eos veritatis neque.</p>
        <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Distinctio maiores adipisci
            quibusdam repudiandae dolor vero placeat esse sit! Quibusdam saepe aperiam explicabo placeat
            optio, consequuntur nihil voluptatibus expedita quia vero perferendis, deserunt et incidunt
            eveniet temporibus doloremque possimus facilis. Possimus labore, officia dolore! Eaque
            ratione saepe, alias harum laboriosam deserunt laudantium blanditiis eum explicabo placeat
            reiciendis labore iste sint. Consectetur expedita dignissimos, non quos distinctio, eos
            rerum facilis eligendi. Asperiores laudantium, rerum ratione consequatur, culpa consectetur
            possimus atque ab tempore illum non dolor nesciunt. Neque, rerum. A vel non incidunt, quod
            doloremque dignissimos necessitatibus aliquid laboriosam architecto at cupiditate commodi
            expedita in, quae blanditiis. Deserunt labore sequi, repellat laboriosam est, doloremque
            culpa reiciendis tempore excepturi. Enim nostrum fugit itaque vel corporis ullam sed tenetur
            ipsa qui rem quam error sint, libero. Laboriosam rem, ratione. Autem blanditiis laborum
            neque repudiandae quam, cumque, voluptate veritatis itaque, placeat veniam ad nisi.
            Expedita, laborum reprehenderit ratione soluta velit natus, odit mollitia. Corporis rerum
            minima fugiat in nostrum. Assumenda natus cupiditate hic quidem ex, quas, amet ipsum esse
            dolore facilis beatae maxime qui inventore, iste? Maiores dignissimos dolore culpa debitis
            voluptatem harum, excepturi enim reiciendis, tempora ab ipsam illum aspernatur quasi qui
            porro saepe iure sunt eligendi tenetur quaerat ducimus quas sequi omnis aperiam suscipit!
            Molestiae obcaecati officiis quo, ratione eveniet, provident pariatur. Veniam quasi expedita
            distinctio, itaque molestiae sequi, dolorum nisi repellendus quia facilis iusto dignissimos
            nam? Tenetur fugit quos autem nihil, perspiciatis expedita enim tempore, alias ab maiores
            quis necessitatibus distinctio molestias eum, quidem. Delectus impedit quidem laborum, fugit
            vel neque quo, ipsam, quasi aspernatur quas odio nihil? Veniam amet reiciendis blanditiis
            quis reprehenderit repudiandae neque, ab ducimus, odit excepturi voluptate saepe ipsam.
            Voluptatem eum error voluptas porro officiis, amet! Molestias, fugit, ut! Tempore non
            magnam, amet, facere ducimus accusantium eos veritatis neque.</p>
    </div>;
}

export default SiteWrap;