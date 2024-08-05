import { Dropdown as Dropdowns } from "react-bootstrap";
export default function Dropdown({
  children,
  data = [],
  menu,
}: {
  children?: React.ReactNode;
  data?: { name?: string; }[];
  menu?: React.ReactNode;
}) {
  return (
    <Dropdowns>
      <Dropdowns.Toggle
        children={children}
        className="bg-transparent border-0 after:hidden p-0"
      ></Dropdowns.Toggle>
      <Dropdowns.Menu>
        {menu ||
          data.map((item, index) => (
            <Dropdowns.Item key={index}>
              {item.name}
            </Dropdowns.Item>
          ))}
      </Dropdowns.Menu>
    </Dropdowns>
  );
}
