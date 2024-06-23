import { adaptCategoryToOption } from "@/adapters/category.adapter";
import { adaptCollectionElements } from "@/adapters/generic.adapter";
import { useApiRequest } from "@/hooks/useApiRequest";
import useRenderInfinite from "@/hooks/useRenderInfinite";
import { Category, OptionWithComponent, QueryObject } from "@/interfaces";
import CategoriesService from "@/services/Category.service";
import {
  Button,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Skeleton,
  useDisclosure,
} from "@chakra-ui/react";
import { FC, useEffect, useState } from "react";
import InfiniteScroll from "react-infinite-scroll-component";

type Props = {
  selectAction: (selection: OptionWithComponent<Category>) => void;
};
const GetCategories: FC<Props> = ({ selectAction }) => {
  // Get categories options
  const categoyService = new CategoriesService();
  const categoryRequest = useApiRequest(
    (filters?: QueryObject[], page?: number) =>
      categoyService.getCategories(filters, page),
    {
      adapter: (categories) =>
        adaptCollectionElements(categories?.data || [], adaptCategoryToOption),
    }
  );

  const { isOpen, onOpen, onClose } = useDisclosure();
  const [actualPage, setActualPage] = useState(1);

  const load =async ():Promise<OptionWithComponent<Category>[]>=>{
    const response= await categoryRequest.executeRequest([], actualPage)
    if(response) return response as OptionWithComponent<Category>[]
    return []
  }

  const {
    dataToRender: categoriesToRender,
    fetchNext,
    hasNext,
  } = useRenderInfinite(
    load,
    {
      onUpdatePage: (_, npage) => {
        setActualPage(npage);
      },
    }
  );



  const [selectedCategory, setSelectedCategory] = useState<
    OptionWithComponent | undefined
  >(undefined);
  const initFetch = async () => {
    await fetchNext();
  };
  useEffect(() => {
    initFetch();
  }, []);

  return (
    <>
      <Button variant={"outline"} onClick={onOpen}>
        {selectedCategory ? selectedCategory.label : "Seleccionar"}
      </Button>
      <Modal
        isCentered
        onClose={onClose}
        isOpen={isOpen}
        motionPreset="slideInBottom"
      >
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Categorias</ModalHeader>
          <ModalCloseButton />
          <ModalBody className=" ">
            <ul className="!h-[40vh] overflow-auto" id="scrollableDiv">
              <InfiniteScroll
                dataLength={categoriesToRender.length} //This is important field to render the next data
                next={fetchNext}
                hasMore={hasNext}
                loader={[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((s) => (
                  <Skeleton
                    key={s}
                    className="!rounded-md !my-2"
                    height={"35px"}
                  />
                ))}
                scrollableTarget="scrollableDiv"
              >
                {categoriesToRender?.map((c) => (
                  <li
                    key={c.id}
                    onClick={() => {
                      onClose();
                      setSelectedCategory(c);
                      selectAction(c);
                    }}
                    className="bg-white  shadow-md rounded my-2 p-2
                        hover:bg-neutral-100 cursor-pointer duration-100
                        "
                  >
                    {c.label}
                  </li>
                ))}
              </InfiniteScroll>
            </ul>
          </ModalBody>
          <ModalFooter>
            <Button colorScheme="blue" mr={3} onClick={onClose}>
              Cerrar
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};

export default GetCategories;
