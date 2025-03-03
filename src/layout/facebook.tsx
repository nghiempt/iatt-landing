import React from "react";

const FacebookPageEmbed = () => {
    return (
        <div className="flex justify-center">
            <iframe
                src="https://www.facebook.com/plugins/page.php?href=https%3A%2F%2Fwww.facebook.com/profile.php?id=100063665163990&width=1000&height=128&small_header=false&adapt_container_width=true&hide_cover=false&show_facepile=true"
                width="1000"
                height="128"
                style={{ border: "none", overflow: "hidden" }}
                scrolling="no"
                frameBorder="0"
                allowFullScreen
                allow="autoplay; clipboard-write; encrypted-media; picture-in-picture; web-share"
            ></iframe>
        </div>
    );
};

export default FacebookPageEmbed;
