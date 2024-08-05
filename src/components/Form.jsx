import { EyeIcon } from 'lucide-react';
import { useEffect, useState } from 'react';
import { EyeOffIcon } from 'lucide-react';
import InputMask from 'react-input-mask';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod';

const validateSubmitSchema = z.object({
  name: z.string().min(1).max(255),
  email: z.string().min(1).max(255).refine(value => /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/gi.test(value)),
  password: z.string().min(8).max(255),
  confirmPassword: z.string().min(8).max(255),
  phone: z.string().refine(value => /([(][0-9]{2}[)])[0-9]{5}-[0-9]{4}/.test(value)),
  cpf: z.string().refine(value => /(?!(\d)\1{2}.\1{3}.\1{3}-\1{2})\d{3}\.\d{3}\.\d{3}-\d{2}/.test(value)),
  cep: z.string(),
  address: z.string(),
  city: z.string(),
  terms: z.boolean().refine(val => val === true)
}).required();

export default function Form() {
  const { register, formState: { errors }, handleSubmit } = useForm(
    { resolver: zodResolver(validateSubmitSchema) }
  )

  const [showPass, setShowPass] = useState('')
  const [cep, setCep] = useState('')
  const cepRegex = /^\d{2}\d{3}[-]\d{3}$/
  const [cepObject, setCepObject] = useState('')

  function handleValidateSubmit(data) {
    console.log(data)
    console.log(errors)
  }

  function handleChangePass() {
    setShowPass(showPass === true ? false : true);
  }

  function handleCep(e) {
    setCep(e.target.value)
  }

  useEffect(() => cepRegex.test(cep) ? searchCep() : errorCep(), [cep])

  function searchCep() {
    fetch(`https://viacep.com.br/ws/${cep}/json/`).then(res => res.json()).then(data => {
      setCepObject(data)
    })
  }
  function errorCep() {
    setCepObject('')
  }

  return (
    <form onSubmit={handleSubmit(handleValidateSubmit)}>
      <div className="mb-4">
        <label htmlFor="nameInput">Nome Completo</label>
        <input type="text" id='nameInput' {...register('name')} />
        {errors.name && <p className="text-xs text-red-400 mt-1">O nome é obrigatório.</p>}
      </div>
      <div className="mb-4">
        <label htmlFor="emailInput">E-mail</label>
        <input className="mb-4" type="email" id="emailInput" {...register('email')} />
        {errors.email && <p className="text-xs text-red-400 mt-1">Email inválido.</p>}
      </div>
      <div className="mb-4">
        <label htmlFor="passwordInput">Senha</label>
        <div className="relative">
          <input type={showPass === true ? "text" : "password"} id="passwordInput" {...register('password')} />
          <span className="absolute right-3 top-3">
            {
              showPass === true ?
                <button type='button' onClick={handleChangePass}>
                  <EyeIcon size={20} className="text-slate-600 cursor-pointer" />
                </button>
                :
                <button type='button' onClick={handleChangePass}>
                  <EyeOffIcon
                    className="text-slate-600 cursor-pointer"
                    size={20}
                  />
                </button>
            }
          </span>
          {errors.password && <p className="text-xs text-red-400 mt-1">A senha deve conter pelo menos 8 caracteres.</p>}
        </div>
      </div>
      <div className="mb-4">
        <label htmlFor="confirmPasswordInput">Confirmar Senha</label>
        <div className="relative">
          <input type={showPass === true ? "password" : "text"} id="confirmPasswordInput" {...register('confirmPassword')} />
          <span className="absolute right-3 top-3">
            {
              showPass === true ?
                <button type='button' onClick={handleChangePass}>
                  <EyeIcon size={20} className="text-slate-600 cursor-pointer" />
                </button>
                :
                <button type='button' onClick={handleChangePass}>
                  <EyeOffIcon
                    className="text-slate-600 cursor-pointer"
                    size={20}
                  />
                </button>
            }
          </span>
          {errors.confirmPassword && <p className="text-xs text-red-400 mt-1">As senhas não são iguais.</p>}
        </div>
      </div>
      <div className="mb-4">
        <label htmlFor="phoneInput">Telefone Celular</label>
        <InputMask mask="(99)99999-9999" type="text" id="phoneInput" {...register('phone')} />
        {errors.phone && <p className="text-xs text-red-400 mt-1">Telefone inválido.</p>}
      </div>
      <div className="mb-4">
        <label htmlFor="cpfInput">CPF</label>
        <InputMask mask="999.999.999-99" type="text" id="cpfInput" {...register('cpf')} />
        {errors.cpf && <p className="text-xs text-red-400 mt-1">CPF inválido.</p>}
      </div>
      <div className="mb-4">
        <label htmlFor="cepInput">CEP</label>
        <InputMask mask="99999-999" type="text" id="cepInput" {...register('cep')} onChange={handleCep} />
        <p className='text-red-400 text-sm'>{cepObject.erro ? 'CEP inválido.' : ''}</p>
      </div>
      <div className="mb-4">
        <label htmlFor="addressInput">Endereço</label>
        <input
          className="disabled:bg-slate-200"
          type="text"
          id="addressInput"
          {...register('address')}
        />
      </div>

      <div className="mb-4">
        <label htmlFor="cityInput">Cidade</label>
        <input
          className="disabled:bg-slate-200"
          type="text"
          id="cityInput"
          value={cepObject ? cepObject.localidade : ''}
          disabled
          {...register('city')}
        />
      </div>
      <div className="mb-4">
        <input type="checkbox" id="termsInput" className="mr-2 accent-slate-500" {...register('terms')} />
        <label
          className="text-sm  font-light text-slate-500 mb-1 inline"
          htmlFor="termsInput"
        >
          Aceito os{' '}
          <span className="underline hover:text-slate-900 cursor-pointer">
            termos e condições
            {errors.terms && <p className="text-xs text-red-400 mt-1">É necessário aceitar os termos e condições.</p>}

          </span>
        </label>
      </div>

      <button
        type="submit"
        className="bg-slate-500 font-semibold text-white w-full rounded-xl p-4 mt-10 hover:bg-slate-600 transition-colors"
      >
        Cadastrar
      </button>
    </form>
  );
}
