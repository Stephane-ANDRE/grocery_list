import Input from "@/components/Input"
import { useState, useCallback } from "react";
import axios from "axios";
import {signIn} from "next-auth/react";
import {FcGoogle} from "react-icons/fc";

const Auth = () => {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    // Toggle between Sign In and Sign Up
const [variant, setVariant] = useState("connexion");
// Defining a function to toggle between "login" and "register" variants
const toggleVariant = useCallback(() => {
    setVariant((currentVariant) => currentVariant === "connexion" ? "register":"connexion")
}, []);

const login = useCallback(async () => {
    try {
        await signIn("credentials", {
            email,
            password,
            callbackUrl: "/profiles"           
        });
    } catch (error) {
        console.log(error);
        // Afficher un message d'erreur ou gérer l'erreur d'une autre manière
        alert("Humm...Désolé, mauvais mail ou mot de passe.");
        // Rediriger l'utilisateur vers une page spécifique
        window.location.href = "/auth"; // Remplacez "previous-page" par l'URL de la page précédente
    }
}, [email, password])

const register = useCallback(async () =>{
    try {
        await axios.post("/api/user/register", {
            email,
            name,
            password
        });

        login()

    } catch (error) {
        console.log(error)
    }
},[email, name, password, login])

    return (
       
        <div className="relative h-full w-full bg-[url('/images/grocery.jpg')] bg-no-repeat bg-center bg-fixed bg-cover">
        <nav className="flex justify-center p-10">
                    <img src="/images/ma_list.png" alt="Ma_List_Logo" className="h-12" />
            </nav>
                <div className="flex justify-center " >
                    <div className="self-center w-full px-16 py-16 mt-2 bg-black rounded-md bg-opacity-70 lg:w-2/5 lg:max-w-md">
                        <h2 className="mb-8 text-4xl font-semibold text-white"> 
                        {variant === "connexion" ? "Connexion":"S'enregistrer"}
                        </h2>
                        <div className="flex flex-col gap-4">
                            {variant === "register" && (
                        <Input
                            label="Pseudo"
                            onChange={(ev: any) => setName (ev.target.value)}
                            id="email"
                            type="email"
                            value={name}/>
                            )}
                            <Input
                            label="Email"
                            onChange={(ev: any) => setEmail (ev.target.value)}
                            id="email"
                            type="email"
                            value={email}/>
                            <Input
                            label="Mot de Passe"
                            onChange={(ev: any) => setPassword (ev.target.value)}
                            id="password"
                            type="password"
                            value={password}/>
                        </div>
                        {/* variant === "connexion" ? login:register */}
                        <button onClick={() => {
                            if (variant === "connexion") {
                                login()
                            } else {
                                register()
                            }
                        }} className="w-full py-3 mt-10 text-white transition bg-orange-400 rounded-md hover:bg-orange-500">
                        {variant === "connexion" ? "Connexion": "Enregistre toi"}
                        </button>
                        <div 
                        onClick={() => signIn("google", {callbackUrl:"/profiles"})}
                        className="flex flex-row items-center justify-center gap-4 mt-8">
                            <div
                                className="flex items-center justify-center w-10 h-10 transition bg-white rounded-full cursor-pointer hover:opacity-50">
                                    <FcGoogle size={30}/>
                            </div>
                           
                        </div>
                        <p className="mt-12 text-neutral-500">
                            {variant === "connexion" ? "Première fois?" : "J'ai déjà un compte : "}
                            <span onClick={toggleVariant} className="ml-1 text-white cursor-pointer hover:underline">
                               {variant === "connexion" ? "Créer toi un compte :)" : "connexion"} 
                            </span>

                        </p>
                    </div>

                </div>
        </div>
    )
}

export default Auth;