import React, { useState } from "react";
import "./menu.css";
import { menu } from "../../Data";
import webmenu from "../../assets/webmenu.pdf";

const Menu = () => {

const [activeIndex, setActiveIndex] = useState(null);
const [touchStartX, setTouchStartX] = useState(0);

/* OPEN POPUP */
const openPopup = (index) => {
  setActiveIndex(index);
};

/* CLOSE */
const closePopup = () => {
  setActiveIndex(null);
};

/* NEXT */
const nextItem = () => {
  setActiveIndex((prev) => (prev + 1) % menu.length);
};

/* PREVIOUS */
const prevItem = () => {
  setActiveIndex((prev) =>
    prev === 0 ? menu.length - 1 : prev - 1
  );
};

/* SWIPE START */
const handleTouchStart = (e) => {
  setTouchStartX(e.touches[0].clientX);
};

/* SWIPE END */
const handleTouchEnd = (e) => {
  const touchEndX = e.changedTouches[0].clientX;
  const diff = touchStartX - touchEndX;

  if (Math.abs(diff) < 50) return;

  if (diff > 0) {
    nextItem(); // swipe left
  } else {
    prevItem(); // swipe right
  }
};

/* PREVENT SCROLL WHILE SWIPING */
const handleTouchMove = (e) => {
  e.preventDefault();
};

return (

<section className="menu section" id="menu">

<h2 className="section__title">
Check Out Some of Our Cafe Favorites
</h2>

<div className="menu__grid container grid">

{menu.map(({ img, title, description }, index) => (

<div 
className="menu__item grid"
key={index}
onClick={() => openPopup(index)}
>

<div className="menu__img-wrapper">
<img src={img} alt={title} className="menu__img" />
</div>

<div className="menu__data">
<h3 className="menu__title">{title}</h3>
<p className="menu__description">{description}</p>
</div>

</div>

))}

</div>

<h1 className="section__title">
Good vibes, great taste and yes,
Vegan-friendly options too.
</h1>

<a href={webmenu} className="btn" id="bt3">
Check Full Menu
</a>


{/* POPUP */}

{activeIndex !== null && (

<div 
className="popup"
onTouchStart={handleTouchStart}
onTouchEnd={handleTouchEnd}
onTouchMove={handleTouchMove}
>

<button className="popup__close" onClick={closePopup}>
×
</button>

<button className="popup__prev" onClick={prevItem}>
‹
</button>

<div className="popup__card">

<img src={menu[activeIndex].img} alt="" />

<h2>{menu[activeIndex].title}</h2>

<p>{menu[activeIndex].description}</p>

</div>

<button className="popup__next" onClick={nextItem}>
›
</button>

</div>

)}

</section>
);

};

export default Menu;