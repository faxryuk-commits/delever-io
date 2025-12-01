import { Link } from 'react-router-dom'
import { Button } from '@/components/ui/Button'
import { Home, Rocket } from 'lucide-react'

export function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center px-4 sm:px-6 lg:px-8 bg-brand-lightBlue">
      <div className="text-center max-w-2xl">
        <div className="text-9xl font-bold text-brand-darkBlue mb-4">404</div>
        <h1 className="text-4xl md:text-5xl font-bold text-brand-darkBlue mb-4">
          Страница не найдена
        </h1>
        <p className="text-xl text-brand-darkBlue/80 mb-8">
          К сожалению, запрашиваемая страница не существует. Возможно, она была перемещена или удалена.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link to="/">
            <Button size="lg" variant="outline">
              <Home className="mr-2 h-5 w-5" />
              На главную
            </Button>
          </Link>
          <Button
            size="lg"
            onClick={() => window.open('https://app.delever.io/register', '_blank')}
          >
            <Rocket className="mr-2 h-5 w-5" />
            Запустить доставку с Delever
          </Button>
        </div>
      </div>
    </div>
  )
}

