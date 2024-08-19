import okImg from '../imgs/okImg.png'
import errorImg from '../imgs/errorImg.png'

export default function Modal({ isActive, isSubmitOk, children }) {
    return (
        isActive === true ?
            isSubmitOk === true ?
                <div className="absolute left-0 top-0 w-full h-fscreen bg-blurColor backdrop-blur-sm z-10 ">
                    <div className="mx-auto mt-28 w-1/2 h-1/3 bg-white sticky top-20 flex items-center justify-center">
                        <div className="w-2/3 h-2/3 mx-auto text-center flex flex-col flex-nowrap justify-between">
                            <img src={okImg} alt="" className='mb-10 w-1/2 mx-auto' />
                            <p className='font-semibold'>Seus dados foram enviado com sucesso.</p>
                            <button onClick={() => window.location.reload()} className="bg-gray-500 mx-auto mt-3 p-2 w-28 bg-slate-500 font-semibold text-white rounded-xl hover:bg-slate-600 transition-colors">
                                Recarregar
                            </button>
                        </div>
                    </div>
                </div>
                :
                <div className="absolute left-0 top-0 w-full h-fscreen bg-blurColor backdrop-blur-sm z-10">
                    <div className="mx-auto mt-28 w-1/2 h-1/3 bg-white sticky top-20 flex items-center justify-center">
                        <div className="w-2/3 h-2/3 mx-auto text-center ">
                            <img src={errorImg} alt="" className='w-1/2 mx-auto' />
                            <p>DEU ERRADO</p>
                            {children}
                        </div>
                    </div>
                </div>
            :
            null)
}
