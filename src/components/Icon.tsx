import BellIcon from '#/icons/bell.svg?react'

type IconProps = {
    name: string
    size?: 'sm' | 'md' | 'lg'
}

const sizeClass = {
    sm: 'w-4 h-4',
    md: 'w-6 h-6',
    lg: 'w-8 h-8',
}

const getIconComponent = (name: IconProps['name']): React.ReactNode => {
    switch (name) {
        case 'bell':
            return <BellIcon />
        default:
            return <span>Icon not found</span>
    }
}

const Icon = ({ name, size = 'md' }: IconProps): React.ReactNode => {
    return <div className={`${sizeClass[size]}`}>
        {getIconComponent(name)}
    </div>
}

export default Icon