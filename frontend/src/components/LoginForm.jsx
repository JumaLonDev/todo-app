import { useForm } from "react-hook-form";
import { login } from "../api/auth.api";
import { useNavigate } from "react-router-dom";

export default function LoginForm() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const navigate = useNavigate();

  
  const onSubmit = async (data) => {
    try {
      const res = await login(data.email, data.password);      
      if (res.data.token) {
        localStorage.setItem("token", res.data.token);
        navigate("/dashboard");
      } else {
        alert("Format of token is invalid");
      }
    } catch (error) {
      console.error("Error completo:", error.res?.data || error);
      alert("Error en credenciales");
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className='space-y-4'>
      <div>
        <label
          className='block texts-sm font-medium text-gray-700'
          htmlFor='email'
        >
          Email
        </label>
        <input
          type='email'
          {...register("email", { required: "Email is required" })}
          className='mt-1 block w-full p-2 border border-gray-300 rounded-md'
          placeholder='Email'
        />
        {errors.email && (
          <p className='text-red-500 text-xs'>{errors.email.message}</p>
        )}
      </div>

      <div>
        <label className='block text-sm font-medium text-gray-700'>
          Password
        </label>
        <input
          type='password'
          {...register("password", { required: "Password is required" })}
          className='mt-1 block w-full p-2 border border-gray-300 rounded-md'
        />
        {errors.password && (
          <p className='text-red-500 text-xs'>{errors.password.message}</p>
        )}
      </div>
      <button
        type='submit'
        className='w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700'
      >
        Login
      </button>
    </form>
  );
}
