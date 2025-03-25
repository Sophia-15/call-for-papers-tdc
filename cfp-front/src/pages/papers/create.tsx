import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useMutation } from '@tanstack/react-query';
import { Paper, PaperService } from '../../services/http/paper';
import { Header } from '../../components/Header';
import { toast } from 'sonner';

const formSchema = z.object({
  title: z.string().min(1, { message: 'Título é obrigatório' }),
  authorName: z.string().min(1, { message: 'Nome do autor(a) é obrigatório' }),
  email: z.string().email({ message: 'Insira um endereço de e-mail válido' }),
  resume: z.string().min(1, { message: 'Resumo é obrigatório' }),
});

type FormValues = z.infer<typeof formSchema>;

export function CreatePapers() {
  const {
    register,
    handleSubmit,
    resetField,
    formState: { errors },
  } = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      authorName: '',
      email: '',
      resume: '',
      title: '',
    },
  });

  const { mutate } = useMutation({
    mutationFn: async (data: Paper) => await PaperService.submitPaper(data),
    onSuccess: () => {
      resetField('authorName');
      resetField('email');
      resetField('resume');
      resetField('title');
      toast.success('Palestra enviada com sucesso!');
    },
    onError: () => {
      toast.success('Houve um erro ao enviar sua palestra');
    },
  });

  async function handleSubmitPaper(data: Paper) {
    mutate(data);
  }

  return (
    <>
      <Header />

      <div className="flex min-h-screen items-center justify-center p-4">
        <div className="w-full max-w-md rounded-lg border-none bg-white/90 shadow-lg transition-all duration-300 hover:shadow-xl backdrop-blur-sm">
          <div className="space-y-1 p-6 rounded-t-lg">
            <h2 className="text-2xl font-medium ">
              Envie sua proposta de palestra
            </h2>
            <p className="text-slate-600 text-sm">
              Preencha todas as informações corretamente!
            </p>
          </div>

          <form
            onSubmit={handleSubmit(handleSubmitPaper)}
            className="space-y-6"
          >
            <div className="space-y-4 p-6">
              <div className="space-y-1">
                <label
                  htmlFor="title"
                  className="text-sm font-medium text-blue-700 block"
                >
                  Título
                </label>
                <input
                  id="title"
                  {...register('title')}
                  className="w-full rounded-md border border-blue-200 px-3 py-2 text-sm focus:border-blue-400 focus:outline-none focus:ring-2 focus:ring-blue-400 transition-all duration-200"
                />
                {errors.title && (
                  <p className="text-xs text-pink-600 mt-1">
                    {errors.title.message}
                  </p>
                )}
              </div>

              <div className="space-y-1">
                <label
                  htmlFor="authorName"
                  className="text-sm font-medium text-blue-700 block"
                >
                  Nome do Autor
                </label>
                <input
                  id="authorName"
                  {...register('authorName')}
                  className="w-full rounded-md border border-blue-200 px-3 py-2 text-sm focus:border-blue-400 focus:outline-none focus:ring-2 focus:ring-blue-400 transition-all duration-200"
                />
                {errors.authorName && (
                  <p className="text-xs text-pink-600 mt-1">
                    {errors.authorName.message}
                  </p>
                )}
              </div>

              <div className="space-y-1">
                <label
                  htmlFor="email"
                  className="text-sm font-medium text-blue-700 block"
                >
                  Email
                </label>
                <input
                  id="email"
                  type="email"
                  {...register('email')}
                  className="w-full rounded-md border border-blue-200 px-3 py-2 text-sm focus:border-blue-400 focus:outline-none focus:ring-2 focus:ring-blue-400 transition-all duration-200"
                />
                {errors.email && (
                  <p className="text-xs text-pink-600 mt-1">
                    {errors.email.message}
                  </p>
                )}
              </div>

              <div className="space-y-1">
                <label
                  htmlFor="resume"
                  className="text-sm font-medium text-blue-700 block"
                >
                  Resumo
                </label>
                <textarea
                  id="resume"
                  {...register('resume')}
                  className="w-full min-h-24 resize-none rounded-md border border-blue-200 px-3 py-2 text-sm focus:border-blue-400 focus:outline-none focus:ring-2 focus:ring-blue-400 transition-all duration-200"
                />

                {errors.resume && (
                  <p className="text-xs text-pink-600 mt-1">
                    {errors.resume.message}
                  </p>
                )}
              </div>
            </div>

            <div className="p-6 rounded-b-lg">
              <button
                type="submit"
                className="w-full rounded-sm text-white bg-blue-500 p-3 cursor-pointer"
              >
                Enviar proposta
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}
