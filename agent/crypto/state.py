import sys
from typing import List, Optional
from langgraph.graph import MessagesState


END = "END"

# Define Crypto TypedDict based on Python version
if sys.version_info < (3, 12):
    from typing_extensions import TypedDict
    
    class Crypto(TypedDict):
        """A cryptocurrency."""
        id: str
        name: str
        symbol: str
        current_price: float
        market_cap: Optional[float]
        volume: Optional[float]
        description: Optional[str]
else:
    from typing import TypedDict
    
    class Crypto(TypedDict):
        """A cryptocurrency."""
        id: str
        name: str
        symbol: str
        current_price: float
        market_cap: Optional[float]
        volume: Optional[float]
        description: Optional[str]


if sys.version_info < (3, 12):
    class SearchProgress(TypedDict):
        """The progress of a cryptocurrency search."""

        query: str
        results: List[str]
        done: bool


    class PlanningProgress(TypedDict):
        """The progress of planning, if applicable."""

        crypto: Crypto
        done: bool
else:
    class SearchProgress(TypedDict):
        """The progress of a cryptocurrency search."""

        query: str
        results: List[str]
        done: bool


    class PlanningProgress(TypedDict):
        """The progress of planning, if applicable."""

        crypto: Crypto
        done: bool


class AgentState(MessagesState):
    """The state of the cryptocurrency agent."""

    selected_crypto_id: Optional[str]
    cryptos: List[Crypto]
    search_progress: List[SearchProgress]
    planning_progress: List[PlanningProgress]
