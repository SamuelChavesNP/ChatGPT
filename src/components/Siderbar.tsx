import { ReactNode } from "react";
import IconCloseR from "./icons/Close";
import IconAdd from "./icons/IconAdd";
import SidebarButton from "./siderbarButton";
import IconTrash from "./icons/TrashIcon";

type Props = {
  children: ReactNode;
  open: boolean;
  onClose: () => void;
  onClear: () => void;
  onNewChat: () => void;
}

const Sidebar = ({ children, open, onClose, onClear, onNewChat }: Props) => {
  return (
    <section className={`fixed left-0 top-0 bottom-0 text-white ${open ? 'w-screen bg-gray-600/75' : 'w-0'} md:w-64 md:static`}>

      <div className={`flex h-screen ${open ? 'ml-0' : '-ml-96'} md:ml-0`}>
        
        <div className="flex flex-col w-64 p-2 bg-gray-900">

          <div onClick={onNewChat} className="flex items-center p-3 rounded-md text-sm cursor-pointer border border-white/20 hover:bg-gray-500/20">
            <IconAdd width={16} height={16} className="mr-3" />
            Nova conversa
          </div>

          <nav className="border-t overflow-y-auto pt-2">{children}</nav>

          <div className="border-t border-gray-700 pt-2" >
            <SidebarButton icon={<IconTrash width={16} height={16}/>} label="Limpar todas as conversas" onClick={onClear} />
          </div>

        </div>

        <div onClick={onClose} className="flex justify-content items-center cursor-pointer w-10 h-10 md:hidden">
          <IconCloseR width={24} height={24} />
        </div>

      </div>
    </section>
  )
}

export default Sidebar;
