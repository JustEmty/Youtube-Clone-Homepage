import { ArrowLeft, Bell, Menu, Mic, Search, Upload, User } from "lucide-react";
import youtubeLogo from "../assets/yt_logo_rgb_light.png";
import Button from "../components/Button";
import { useState } from "react";
import { useSidebarContext } from "../contexts/SidebarContext";

function PageHeader() {
  const [showFullWidthSearch, setShowFullWidthSearch] = useState(false);

  return (
    <div className="mx-4 mb-6 flex justify-between gap-10 pt-2 lg:gap-20">
      <PageHeaderFirstSection hidden={showFullWidthSearch} />
      <form
        className={`flex-grow flex-row justify-center gap-4 ${showFullWidthSearch ? "flex" : "hidden sm:flex"}`}
      >
        {showFullWidthSearch && (
          <Button
            onClick={() => setShowFullWidthSearch(false)}
            type="button"
            className="flex-shrink-0"
            size="icon"
            variant="ghost"
          >
            <ArrowLeft />
          </Button>
        )}
        <div className="flex max-w-[600px] flex-grow flex-row">
          <input
            type="search"
            placeholder="Search"
            className="w-full rounded-l-full border border-secondary-border px-4 py-1 text-lg shadow-inner shadow-secondary outline-none focus:border-blue-500"
          />
          <Button className="flex-shrink-0 rounded-r-full border border-l-0 border-secondary-border px-4 py-2">
            <Search />
          </Button>
        </div>
        <Button type="button" className="flex-shrink-0" size="icon">
          <Mic />
        </Button>
      </form>
      <div
        className={`flex-shrink-0 flex-row md:gap-2 ${showFullWidthSearch ? "hidden" : "flex"}`}
      >
        <Button
          onClick={() => setShowFullWidthSearch(true)}
          size="icon"
          variant="ghost"
          className="sm:hidden"
        >
          <Search />
        </Button>
        <Button size="icon" variant="ghost" className="sm:hidden">
          <Mic />
        </Button>
        <Button size="icon" variant="ghost">
          <Upload />
        </Button>
        <Button size="icon" variant="ghost">
          <Bell />
        </Button>
        <Button size="icon" variant="ghost">
          <User />
        </Button>
      </div>
    </div>
  );
}

type PageHeaderFirstSectionProps = {
  hidden?: boolean;
};

export function PageHeaderFirstSection({
  hidden = false,
}: PageHeaderFirstSectionProps) {
  const { toggle } = useSidebarContext();

  return (
    <div
      className={`flex-shrink-0 items-center gap-4 ${hidden ? "hidden" : "flex"}`}
    >
      <Button onClick={toggle} variant="ghost" size="icon">
        <Menu />
      </Button>
      <a href="/">
        <img className="h-auto w-24" src={youtubeLogo} alt="youtube-logo" />
      </a>
    </div>
  );
}

export default PageHeader;
