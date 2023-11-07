import { useState, useEffect } from "react"
import { Container } from "../../components/container"
import { FaWhatsapp } from "react-icons/fa"
import { useParams, useNavigate } from "react-router-dom"
import { getDoc, doc } from "firebase/firestore"
import { db } from "../../services/firebaseConnection"
import { Swiper, SwiperSlide } from "swiper/react"

interface CarProps {
    id: string;
    name: string;
    year: string;
    price: string | number;
    city: string;
    km: string;
    images: CarImgesProps;
    uid: string;
    model: string
    description: string
    created: string
    owner: string
    whatsapp: string
}

interface CarImgesProps {
    name: string;
    uid: string
    url: string
}

export const CarScreen = () => {

    const { id } = useParams()
    const [car, setCar] = useState<CarProps>()
    const [sliderPerView, setSliderPerView] = useState<number>(2)
    const navigate = useNavigate()

    useEffect(() => {
        loadCar()
    }, [id])

    const loadCar = async () => {
        if (!id) { return }

        const docRef = doc(db, "cars", id)
        getDoc(docRef)
            .then((snap) => {

                if (!snap.data()) {
                    navigate("/")
                }

                setCar({
                    id: snap.id,
                    name: snap.data()?.name,
                    year: snap.data()?.year,
                    price: snap.data()?.price,
                    city: snap.data()?.city,
                    km: snap.data()?.km,
                    model: snap.data()?.model,
                    description: snap.data()?.description,
                    owner: snap.data()?.owner,
                    whatsapp: snap.data()?.whatsapp,
                    uid: snap.data()?.uid,
                    created: snap.data()?.created,
                    images: snap.data()?.images
                })
            })
    }


    useEffect(() => {
        handleResize()

        window.addEventListener('resize', handleResize)

        return (() => {
            window.removeEventListener('resize', handleResize)
        })
    }, [])

    const handleResize = () => {
        if (window.innerWidth < 720) {
            setSliderPerView(1)
        } else {
            setSliderPerView(2)
        }
    }

    return (
        <Container>

            {car &&
                <Swiper
                    slidesPerView={sliderPerView}
                    pagination={{ clickable: true }}
                    navigation
                >
                    {car?.images.map(image => {
                        return (
                            <SwiperSlide key={image.name}>
                                <img
                                    src={image.url}
                                    className="w-full h-96 object-cover"
                                />
                            </SwiperSlide>
                        )
                    })}
                </Swiper>
            }

            {car &&
                <main className="w-full bg-white rounded-lg p-6 my-4">
                    <div className="flex flex-col sm:flex-row mb-4 items-center justify-between">
                        <h1 className="font-bold text-3xl text-black">{car?.name}</h1>
                        <h1 className="font-bold text-3xl text-black">R$ {car?.price}</h1>
                    </div>
                    <p>{car?.model}</p>

                    <div className="flex w-full gap-6 my-4">
                        <div className="flex flex-col gap-4">
                            <div>
                                <p>Cidade</p>
                                <strong>{car?.city}</strong>
                            </div>
                            <div>
                                <p>Ano</p>
                                <strong>{car?.year}</strong>
                            </div>
                        </div>


                        <div className="flex flex-col gap-4">
                            <div>
                                <p>KM</p>
                                <strong>{car?.km}</strong>
                            </div>
                        </div>
                    </div>

                    <strong>Descrição</strong>
                    <p className="mb-4">{car?.description}</p>

                    <strong>Telefone / WhatsApp</strong>
                    <p className="mb-4">{car?.whatsapp}</p>

                    <a
                        href={`https://api.whatsapp.com/send?phone=${car?.whatsapp}&text=Olá, vi esse ${car?.name} no site WebCarros e fiquei interessado`}
                        target="_blank"
                        className="bg-green-500 w-full text-white flex items-center justify-center gap-2 my-6 h-11 text-xl rounded-lg font-medium cursor-pointer"
                    >
                        Conversar com vendedor
                        <FaWhatsapp size={26} color="#fff" />
                    </a>
                </main>
            }
        </Container>
    )
}