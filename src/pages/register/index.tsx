import { useEffect, useContext } from "react"
import logoImg from "../../assets/logo.svg"
import { Container } from "../../components/container"
import { Link, useNavigate } from "react-router-dom"
import { Input } from "../../components/input"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { auth } from "../../services/firebaseConnection"
import { createUserWithEmailAndPassword, signOut, updateProfile } from "firebase/auth"
import { AuthContext } from "../../contexts/AuthContext"
import toast from "react-hot-toast"

const schema = z.object({
    email: z.string().email("Insira um email válido").nonempty("O campo email é obrigatório"),
    password: z.string().min(6, "A senha deve ter pelo menos 6 caracteres").nonempty("O campo senha é obrigatório"),
    name: z.string().nonempty("O campo nome é obrigatório"),
})

type FormData = z.infer<typeof schema>

export const LoginRegister = () => {

    const { handleInfoUser } = useContext(AuthContext)
    const { register, handleSubmit, formState: { errors } } = useForm<FormData>({
        resolver: zodResolver(schema),
        mode: "onChange"
    })
    const navigate = useNavigate()

    useEffect(() => {
        handleLogout()
    }, [])

    const handleLogout = async () => {
        await signOut(auth)
    }

    const onSubmit = async (data: FormData) => {
        try {
            createUserWithEmailAndPassword(auth, data.email, data.password)
                .then(async (user) => {
                    await updateProfile(user.user, {
                        displayName: user.name
                    })
                    handleInfoUser({
                        name: data.name,
                        email: data.email,
                        uid: user.user.uid
                    })
                    toast.success("Bem vindo ao webcarros!")
                    navigate("/dashboard", { replace: true })
                })
                .catch((err) => {
                    console.log("Erro ao cadastrar este usuario")
                    console.log(err)
                })

        } catch (e) {
            console.log(e)
        }
    }

    return (
        <Container>
            <div className="w-full min-h-screen flex justify-center items-center flex-col gap-4">
                <Link to="/" className="mb-6 max-w-sm w-full">
                    <img
                        src={logoImg}
                        alt="Logo do site"
                        className="w-full"
                    />
                </Link>

                <form className="bg-white max-w-xl w-full rounded-lg p-4" onSubmit={handleSubmit(onSubmit)}>

                    <div className="mb-3">
                        <Input
                            type="text"
                            placeholder="Digite seu nome completo"
                            name="name"
                            error={errors.name?.message}
                            register={register}
                        />
                    </div>

                    <div className="mb-3">
                        <Input
                            type="email"
                            placeholder="Digite um email..."
                            name="email"
                            error={errors.email?.message}
                            register={register}
                        />
                    </div>

                    <div className="mb-3">
                        <Input
                            type="password"
                            placeholder="Digite sua senha..."
                            name="password"
                            error={errors.password?.message}
                            register={register}
                        />
                    </div>

                    <button type="submit" className="bg-zinc-900 w-full rounded-md text-white h-10 font-medium">
                        Cadastrar
                    </button>
                </form>
                <Link to="/login">
                    Já possui uma conta? Faça o login
                </Link>
            </div>
        </Container>
    )
}