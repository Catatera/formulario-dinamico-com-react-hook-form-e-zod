import loadImg from '../imgs/loading.gif'

export default function Modal() {
    return (
        <div className="absolute w-full h-fscreen bg-blurColor backdrop-blur-sm z-10">
            <div className="mx-auto mt-28 w-1/2 h-1/3 bg-white sticky top-20 flex items-center justify-center">
                <div id="MUDARESSA" className="w-2/3 h-2/3 mx-auto text-center ">
                    <img src={loadImg} alt="" className='w-1/3 mx-auto' />
                    <h1 className='my-8'>Processando sua requisição...</h1>
                    <p className='mt-8'>{ }Texto de conclusão</p>
                </div>
            </div>
        </div>
    )
}