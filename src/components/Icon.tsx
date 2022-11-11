type iconType = 'phone'

interface Props {
  icon: iconType
  className?: string
}

const Icon = ({ icon, className }:Props) => {
  const getPath = () => {
    switch (icon) {
      case 'phone':
        return (
          <path fill="currentColor" d="m20.33 21.48l2.24-2.24a2.19 2.19 0 0 1 2.34-.48l2.73 1.09a2.18 2.18 0 0 1 1.36 2v5A2.17 2.17 0 0 1 26.72 29C7.59 27.81 3.73 11.61 3 5.41A2.17 2.17 0 0 1 5.17 3H10a2.16 2.16 0 0 1 2 1.36l1.09 2.73a2.16 2.16 0 0 1-.47 2.34l-2.24 2.24s1.29 8.73 9.95 9.81Z"/>
        )
    }
  }


  return (
    <svg className={className} xmlns="http://www.w3.org/2000/svg" width="1rem" height="1rem" preserveAspectRatio="xMidYMid meet" viewBox="0 0 32 32">
      {getPath()}
    </svg>
  )
}

export default Icon
