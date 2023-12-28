import { createContext, useState, useEffect, useContext } from "react";
import { signInWithEmailAndPassword, getAuth, onAuthStateChanged, signOut, createUserWithEmailAndPassword } from 'firebase/auth';
import { getFirestore, doc, setDoc, getDoc } from "firebase/firestore";
import firebaseApp from '../firebase/credenciales';
import { useNavigate } from "react-router-dom";

const auth = getAuth(firebaseApp);

const AuthContext = createContext();

// Custom hook para no tener que andar importando useContext en todos los archivos
export const useAuth = () => {
  const context = useContext(AuthContext); // Usamos el context
  if (!context) {
    throw new Error("useAuth debería estar dentro del provider");
  }
  return context;
}

export const AuthProvider = ({ children }) => {
  const [usuario, setUsuario] = useState(null);
  const [autenticado, setAutenticado] = useState(false);
  const navigate = useNavigate();
  const firestore = getFirestore(firebaseApp);

  console.log(usuario)

  const obtenerRol = async (uid) => {
    const docuRef = doc(firestore, `usuarios/${uid}`); //En firebase la url esta usuarios/id entonces busca ahi el rol de ese usuario
    const docuCifrada = await getDoc(docuRef); //la doc aca viene cifrada
    const infoFinal = docuCifrada.data().rol; //Descifra la data de docuCifrada
    return infoFinal;
  }

  //Cuando se monta la apliacicacion se ejecuta esto y tambien cuando hay login y register
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (usuarioFirebase) => {
      if (usuarioFirebase) {
        if (!usuario) {
          obtenerRol(usuarioFirebase.uid).then( rol => {
            const dataUsuario = {
              uid: usuarioFirebase.uid,
              email: usuarioFirebase.email,
              rol: rol
            }
            setUsuario(dataUsuario);
          }).catch(error => {
            setUsuario(null);
            console.log(error)
          });
        }
        setAutenticado(true);
      } else {
        setUsuario(null);
        setAutenticado(false)
      }
    });
    return () => unsubscribe();
  }, []);

  //Guarda el usuario en firebase
  const registrarUsuario = async (email, password, nombreUsuario) => {  
    try {
      const infoUsuario = await createUserWithEmailAndPassword(auth, email, password).then( usuarioFirebase => { return usuarioFirebase })
      const { uid } = infoUsuario.user;
      const docDB = doc(firestore, `usuarios/${uid}`);
      setDoc(docDB, { nombreUsuario, email, password, rol: "cliente" }); //Se guarda la info en la base de datos de firebase
      setAutenticado(true);
    } catch (error) {
      console.log(error)
    }
  }

  const login = async (e) => {
    e.preventDefault();
    const email = e.target.email.value;
    const password = e.target.password.value;

    try {
      await signInWithEmailAndPassword(auth, email, password)
      } catch (error) {
      console.log(error)
    }
  }

  const cerrarSesion = async () => {
    try {
      setUsuario(null);
      setAutenticado(false);
      await signOut(auth);
      // En este punto, el evento onAuthStateChanged se disparará y actualizará el estado del usuario.
    } catch (error) {
      console.error('Error al cerrar sesión:', error);
    }
  };

  return (
    <AuthContext.Provider value={{ login, cerrarSesion, autenticado, registrarUsuario, usuario }}>
      {children}
    </AuthContext.Provider>
  )
}
