function StatCard({

    title,

    value,

    icon,

}){

    return(

        <div className="bg-white rounded-2xl shadow-md p-6 flex justify-between items-center">

            <div>

                <p className="text-gray-500">

                    {title}

                </p>

                <h2 className="text-3xl font-bold mt-2">

                    {value}

                </h2>

            </div>

            <div className="text-5xl">

                {icon}

            </div>

        </div>

    )

}

export default StatCard;