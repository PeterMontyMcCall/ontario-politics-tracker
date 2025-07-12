const newsOutlets = {
    "CBC": {
        name: "CBC",
        id: "cbc",
        logo: {
            imageSrc: "source/cbc_logo.png",
            height: "16px"
        }
    },
    "National Post": {
        name: "National Post",
        id: "national_post",
        logo: {
            imageSrc: "source/national_post_logo.png",
            height: "19px"
        }
    },
    "Toronto Star": {
        name: "Toronto Star",
        id: "toronto_star",
        logo: {
            imageSrc: "source/toronto_star_logo.png",
            height: "18px"
        }
    },
    "CTV News": {
        name: "CTV News",
        id: "ctv_news",
        logo: {
            imageSrc: "source/ctv_news_logo.png",
            height: "20px"
        }
    },
    "Global News": {
        name: "Global News",
        id: "global_news",
        logo: {
            imageSrc: "source/global_news_logo.png",
            height: "40px"
        }
    }
};

export function normalizeOutletDBName(outlet) {
    const map = {
        cbc: "CBC",
        national_post: "National Post",
        toronto_star: "Toronto Star",
        ctv_news: "CTV News",
        global_news: "Global News"
    };
    return map[outlet] || outlet;
}

export default newsOutlets;