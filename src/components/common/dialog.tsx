import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
  } from "@/components/ui/dialog"

  
    interface Props {
        open?: boolean;
        width?: number;
        title?: string;
        triggerBtn: React.ReactNode;
        content: React.ReactNode;
    }

    export const DefaultDialog = ({open,title,triggerBtn, content }: Props) => {
        return (
            <Dialog>
                <DialogTrigger asChild>{triggerBtn}</DialogTrigger>
                <DialogContent>
                    <DialogHeader >
                        {/* <DialogTitle></DialogTitle> */}
                        <DialogDescription>{title}</DialogDescription>
                    </DialogHeader>
                    {content}
                </DialogContent>
            </Dialog>
        )
    }