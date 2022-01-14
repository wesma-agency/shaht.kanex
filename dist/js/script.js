document.addEventListener(
	"DOMContentLoaded",
	function () {
		let sliderMain = new Swiper(".slider-main", {
			slidesPerView: 1,
			watchOverflow: true,

			navigation: {
				nextEl: ".slider-main__next",
				prevEl: ".slider-main__prev",
			},
		});

		let sliderServices = new Swiper(".slider-services", {
			slidesPerView: 1,
			spaceBetween: 20,
			centeredSlides: false,
			initialSlide: 1,
			loop: true,
			watchOverflow: true,

			navigation: {
				nextEl: ".services__next",
				prevEl: ".services__prev",
			},

			breakpoints: {
				1170: {
					slidesPerView: "auto",
					centeredSlides: true,
					initialSlide: 2,
				},

				768: {
					slidesPerView: 2,
					spaceBetween: 20,
				},
			},
		});

		let slideClients = new Swiper(".slider-clients", {
			slidesPerView: 2,
			spaceBetween: 20,
			watchOverflow: true,
			autoplay: {
				delay: 4000,
			},

			navigation: {
				nextEl: ".clients__next",
				prevEl: ".clients__prev",
			},

			breakpoints: {
				900: {
					slidesPerView: 4,
					spaceBetween: 45,
				},

				768: {
					slidesPerView: 4,
					spaceBetween: 20,
				},

				600: {
					slidesPerView: 3,
					spaceBetween: 20,
				},
			},
		});

		let slideCertificates = new Swiper(".slider-certificates", {
			slidesPerView: 1,
			spaceBetween: 30,
			watchOverflow: true,

			navigation: {
				nextEl: ".certificates__next",
				prevEl: ".certificates__prev",
			},
		});

		let sliderGalleryProject = new Swiper(".gallery-project__slider", {
			slidesPerView: 1,
			spaceBetween: 20,
			watchOverflow: true,

			navigation: {
				nextEl: ".gallery-project__next",
				prevEl: ".gallery-project__prev",
			},

			breakpoints: {
				900: {
					slidesPerView: 3,
					spaceBetween: 30,
				},

				768: {
					slidesPerView: 2,
					spaceBetween: 30,
				},
			},
		});
	},
	false
);

$(document).ready(function () {
	// Клон элементов в мобильное меню

	$.each($(".js-mobile-menu > li"), function (index, val) {
		let clone = $(val).clone();
		$("#menu > ul").append(clone);
	});

	let arrLinkSocial = [];

	$.each($(".header__list-social"), function (index, val) {
		let clone = $(val).clone();
		arrLinkSocial.push(clone[0]);
	});

	// Активация мобильного меню

	$("#menu").mmenu({
		extensions: ["pagedim-black", "position-left"],
		navbar: { title: "Меню" },
		navbars: [
			{
				position: "bottom",
				content: arrLinkSocial,
			},
		],
	});

	var $menu = $("#menu");
	var $icon = $(".mobile-menu");
	var API = $menu.data("mmenu");

	function openMenu() {
		API.open();
	}

	function closeMenu() {
		API.close();
	}

	$icon.on("click", openMenu);

	API.bind("open:start", function () {
		$icon.addClass("is-active");
		$("html").addClass("lock");
	});
	API.bind("close:finish", function () {
		$icon.removeClass("is-active");
		$("html").removeClass("lock");
	});

	//Попапы
	$(".js-show-popup").on("click", function (e) {
		e.preventDefault();
		$(".modal").fadeOut();

		$(".popup-overlay").fadeIn();
		$($(this).attr("href")).fadeIn();
		$($(this).attr("href")).css({ "max-height": $(window).height() });

		$("body").addClass("lock");

		if ($(this).hasClass("--video")) {
			let srcVideo = $(this).attr("data-video-src");
			let srcIframe = $($(this).attr("href")).find("iframe").attr("src");
			if (!srcIframe.includes(srcVideo)) {
				$($(this).attr("href"))
					.find("iframe")
					.attr("src", srcIframe + srcVideo);
			}
		}
	});

	$(".js-modal-close").on("click", function (e) {
		$(this).parents(".modal").fadeOut();
		$(".popup-overlay").fadeOut();
		$("body").removeClass("lock");
	});

	$(".popup-overlay").on("click", function (e) {
		$(".modal").fadeOut();
		$(this).fadeOut();
		$("body").removeClass("lock");
	});

	// Скрипт табов
	$(".js-tab").on("click", function (e) {
		e.preventDefault();

		let elementId = $(this).attr("href");

		$(this).parent().find(".js-tab").removeClass("active");

		$(this).addClass("active");

		new Promise((resolve, reject) => {
			$(elementId).parent().find(".js-tab-item").removeClass("active");
			setTimeout(() => {
				$(elementId).parent().find(".js-tab-item").css({ display: "none" });
				resolve();
			}, 200);
		}).then(() => {
			setTimeout(() => {
				$(elementId).addClass("active");
			}, 100);

			$(elementId).css({ display: "block" });
		});
	});

	$(".js-tab").eq(0).click();

	//======= АНИМАЦИЯ СЧЕТА ЧИСЕЛ
	let countbox = ".advantages-main";
	let show = true;

	$(window).on("scroll load resize", function () {
		if ($(countbox).length > 0) {
			if (!show) return false;
			let w_top = $(window).scrollTop();
			let e_top = $(countbox).offset().top;
			let w_height = $(window).height();
			let d_height = $(document).height();
			let e_height = $(countbox).outerHeight();

			if (w_top + 500 >= e_top || w_height + w_top == d_height || e_height + e_top < w_height) {
				$(".advantages-main__number span").spincrement({
					thousandSeparator: "",
					duration: 2000,
				});

				show = false;
			}
		}
	});

	//===============ANIMATION SCROLL======================
	const animItems = $(".anim-items");

	if (animItems.length > 0) {
		$(window).on("scroll", animOnScroll);
		function animOnScroll() {
			$.each(animItems, function (index, val) {
				const animItem = animItems.eq(index);
				const animItemHeight = animItem.innerHeight();
				const animItemOffset = animItem.offset().top;
				const animStart = 10; // начало анимации при достижении скролом 1/10 части элемента

				let animItemPoint = $(window).height() - animItemHeight / animStart;

				if (animItemHeight > $(window).height()) {
					animItemPoint = $(window).height() - $(window).height() / animStart;
				}

				if ($(window).scrollTop() > animItemOffset - animItemPoint && $(window).scrollTop() < animItemOffset + animItemHeight) {
					animItem.addClass("animate");
				} else {
					if (!animItem.hasClass("anim-no-scrollTop")) {
						animItem.removeClass("animate");
					}
				}
			});
		}
		setTimeout(animOnScroll, 0);
	}

	match = window.matchMedia("(min-width: 990px)");

	let detailDescription = $(".project-info__text p .text-info").text();
	let pcDescription = detailDescription.substring(0, 485);

	if (detailDescription.length > 485) {
		if ($(".project-info__text").hasClass("--hidden")) {
			$(".project-info__text p .text-info").text(pcDescription);
		}

		$(".project-info__text p .text-info").text(pcDescription);
		$(".project-info__text").addClass("--hidden");

		$(".project-info__text p").append("<span class='all-description'><span>Подробнее</span></span>");

		let buttonAll = $(".all-description");

		buttonAll.on("click", function () {
			if ($(".project-info__text").hasClass("--hidden")) {
				$(".project-info__text").removeClass("--hidden");
				$(".project-info__text p .text-info").text(detailDescription);

				buttonAll.find("span").text("Скрыть");
				buttonAll.addClass("--hidden");
			} else {
				$(".project-info__text").addClass("--hidden");
				$(".project-info__text p .text-info").text(pcDescription);

				buttonAll.find("span").text("Подробнее");
				buttonAll.removeClass("--hidden");
			}
		});
	}
});
