import { EyeIcon } from 'lucide-react';
import { useState } from 'react';
import { EyeOffIcon } from 'lucide-react';
import InputMask from 'react-input-mask';

export default function Form() {

  const [pass, setPass] = useState('')
  const [cep, setCep] = useState('')
  const [cepObj, setCepObj] = useState('')


  function handleChangePass() {
    setPass(pass === true ? false : true);
  }

  const handleChangeCep = (e) => {
    setCep(e.target.value)
    findCep(cep)
  }

  async function findCep(cep) {
    await fetch(`https://viacep.com.br/ws/${cep}/json/`).then(res => res.json()).then(data => {
      setCepObj(data)
    })
    console.log(cepObj)
  }

  return (
    <form>
      <div className="mb-4">
        <label htmlFor="name">Nome Completo</label>
        <input type="text" id="name" />
        {/* Sugestão de exibição de erro de validação */}
        <div className="min-h-4">
          <p className="text-xs text-red-400 mt-1">O nome é obrigatório.</p>
        </div>
      </div>
      <div className="mb-4">
        <label htmlFor="email">E-mail</label>
        <input className="" type="email" id="email" />
      </div>
      <div className="mb-4">
        <label htmlFor="password">Senha</label>
        <div className="relative">
          <input type={pass === true ? "password" : "text"} id="confirm-password" />
          <span className="absolute right-3 top-3">
            {
              pass === true ?
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
        </div>
      </div>
      <div className="mb-4">
        <label htmlFor="confirm-password">Confirmar Senha</label>
        <div className="relative">
          <input type={pass === true ? "password" : "text"} id="confirm-password" />
          <span className="absolute right-3 top-3">
            {
              pass === true ?
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
        </div>
      </div>
      <div className="mb-4">
        <label htmlFor="phone">Telefone Celular</label>
        <InputMask mask="(99)99999-9999" type="text" id="phone" />
      </div>
      <div className="mb-4">
        <label htmlFor="cpf">CPF</label>
        <InputMask mask="999.999.999-99" type="text" id="cpf" />
      </div>
      <div className="mb-4">
        <label htmlFor="cep">CEP</label>
        <InputMask mask="99999-999" type="text" id="cep" onBlur={handleChangeCep} />
        {cepObj.localidade ? <p></p> : <p>Cep não encontrado</p>}
      </div>
      <div className="mb-4">
        <label htmlFor="address">Endereço</label>
        <input
          className="disabled:bg-slate-200"
          type="text"
          id="address"
          disabled
        />
      </div>

      <div className="mb-4">
        <label htmlFor="city">Cidade</label>
          <input
            className="disabled:bg-slate-200"
            type="text"
            id="address"
            value={cepObj.localidade}
            disabled
          />
      </div>
      {/* terms and conditions input */}
      <div className="mb-4">
        <input type="checkbox" id="terms" className="mr-2 accent-slate-500" />
        <label
          className="text-sm  font-light text-slate-500 mb-1 inline"
          htmlFor="terms"
        >
          Aceito os{' '}
          <span className="underline hover:text-slate-900 cursor-pointer">
            termos e condições
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
