const Twitter = ({ content }) => {
    return (
        <>
            <div className="overflow-hidden">
                <div >
                    <div>
                        <div className="flex items-center overflow-hidden">
                            <img
                                className="h-[120px] w-[120px] shrink-0 rounded-full object-contain"
                                src={content.song.thumbnails[0].url}
                                alt="thumbnail"
                                referrerPolicy="no-referrer"
                                crossOrigin="anonymous"
                            />
                            <div className="mx-[30px] -mt-[16px] flex min-w-0 flex-col">
                                <span
                                    className={`-mt-[25px] truncate text-[42px] font-light leading-[2]`}
                                >
                                    {content.song.title}
                                </span>
                                <span
                                    className={`-mt-[25px] truncate text-[36px] font-light leading-[2] text-white`}
                                >
                                    {content.song.artist}
                                </span>
                            </div>
                        </div>
                    </div>
                    <div>
                        <p>{content.message}</p>
                    </div>
                    <div>
                        <div className="flex items-center justify-center">
                            <img className="mr-[8px] h-[36px] w-[36px]" src={logo} alt="disc" />
                            <span className="gimmesong-primary-font -mt-[27.5px] text-[36px] tracking-wider">
                            GIMMESONG
                            </span>
                        </div>
                        <span>gimmesong.link/@{username}</span>
                    </div>

                </div>
            </div>
        </>
    );
}