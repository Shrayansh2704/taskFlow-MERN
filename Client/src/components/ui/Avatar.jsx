function Avatar({ src, size = 140 }) {

    return (

        <img

            src={
                src ||
                "https://ui-avatars.com/api/?background=BDEB25&color=111827&name=User"
            }

            alt="Profile"

            style={{
                width: size,
                height: size,
            }}

            className="rounded-full object-cover border-4 border-[#BDEB25] shadow-lg"

        />

    );

}

export default Avatar;