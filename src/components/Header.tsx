import IconAdd from "./icons/IconAdd";
import IconMenu from "./icons/MenuIcon"

type Props = {
  openSiderbarClick: () => void;
  title: string;
  newChatClick: () => void;
}

export const Header = ({openSiderbarClick, title, newChatClick}: Props) => {
  return (
    <header className="flex justify-between items-center w-full border-b border-b-gray-600 p-2 md:hidden">

      <div onClick={openSiderbarClick}>
        <IconMenu width={24} height={24}/>
      </div>

      <div className="mx-2 truncate">{title}</div>

      <div onClick={newChatClick}>
        <IconAdd width={24} height={24}/>
      </div>

    </header>
  )
}